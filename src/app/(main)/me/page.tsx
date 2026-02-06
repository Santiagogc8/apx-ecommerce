"use client"
import { useMe } from "@/src/lib/hooks";
import { fetchApi } from "@/src/lib/api";
import { Skeleton } from "@/src/ui/Skeleton";
import { useState, useEffect } from "react";
import { PrimaryBtn } from "@/src/ui/PrimaryBtn";
import { SecondaryBtn } from "@/src/ui/SecondaryBtn";
import { InputField } from "@/src/ui/InputField";
import { Modal } from "@/src/ui/Modals";

export default function MePage() {
    const { user, error, isLoading, mutate } = useMe();
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    // Estado inicial
    const [formData, setFormData] = useState({
        user: { phone: '', name: '' },
        address: {
            department: '', city: '', streetLine: '', 
            neighborhood: '', additionalInfo: '', zipCode: ''
        }
    });

    // Sincronización de datos
    useEffect(() => {
        if (user && !isSaving) {
            setFormData({
                user: {
                    name: user.name || '',
                    phone: user.phone || ''
                },
                address: {
                    department: user.address?.department || "",
                    city: user.address?.city || "",
                    streetLine: user.address?.streetLine || "",
                    neighborhood: user.address?.neighborhood || "",
                    additionalInfo: user.address?.additionalInfo || "",
                    zipCode: user.address?.zipCode || ""
                }
            });
        }
    }, [user]); 

    // Recibe la sección primero, y devuelve la función del evento
    const handleChange = (section: 'user' | 'address') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const originalData = {
            user: {
                name: user.name || '',
                phone: user.phone || ''
            },
            address: {
                department: user.address?.department || "",
                city: user.address?.city || "",
                streetLine: user.address?.streetLine || "",
                neighborhood: user.address?.neighborhood || "",
                additionalInfo: user.address?.additionalInfo || "",
                zipCode: user.address?.zipCode || ""
            }
        };

        // Comparamos usando JSON.stringify
        const userChanged = JSON.stringify(formData.user) !== JSON.stringify(originalData.user);
        const addressChanged = JSON.stringify(formData.address) !== JSON.stringify(originalData.address);

        try {
            const promises = [];

            if (userChanged) {
                promises.push(fetchApi('/me', {
                    method:'PATCH',
                    body: JSON.stringify(formData.user)
                })); 
            }

            if (addressChanged) {
                const addressToSend = {
                    ...formData.address,
                    neighborhood: formData.address.neighborhood || undefined,
                    zipCode: formData.address.zipCode || undefined,
                    additionalInfo: formData.address.additionalInfo || undefined
                };

                promises.push(fetchApi('/me/address', {
                    method:'PATCH',
                    body: JSON.stringify(addressToSend)
                })); 
            }

            // Si no hubo cambios en user y address
            if (!userChanged && !addressChanged) {
                setIsSaving(false); // Cambiamos el estado de isSaving a false
                return; // Y retornamos la funcion
            }

            // Ejecutamos las llamadas necesarias en paralelo
            await Promise.all(promises);

            await mutate();
            setShowSuccessModal(true)

        } catch (err) {
            setShowErrorModal(true);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-30 flex flex-col items-center gap-6 px-4">
                <Skeleton customClasses="w-48 h-8 rounded-md" />
                <Skeleton customClasses="w-full max-w-2xl h-[500px] rounded-2xl"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="flex flex-col gap-5 items-center">
                    <p className="font-medium">Ocurrió un error al cargar tu información</p>
                    <PrimaryBtn handleClick={() => window.location.reload()}>
                        Intentar recargar
                    </PrimaryBtn>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen flex flex-col items-center pt-28 px-4">
            {user && (
                <div className="w-full max-w-2xl">
                    <h3 className="text-xl md:text-3xl text-center mb-6">
                        Bienvenido de nuevo{user?.name ? ', ' + user?.name.split(' ')[0] : ""}
                    </h3>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-10">
                        <div className="animate-fade-in">
                            <h4 className="text-lg font-bold border-b border-gray-100 pb-3 mb-5">
                                Datos Personales
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField 
                                    label="Nombre Completo"
                                    name="name"
                                    value={formData.user.name}
                                    onChange={handleChange('user')} 
                                    placeholder="Tu nombre completo"
                                    required
                                />
                                <InputField 
                                    label="Teléfono"
                                    name="phone"
                                    type="tel"
                                    value={formData.user.phone}
                                    onChange={handleChange('user')}
                                    placeholder="300 123 4567"
                                    pattern="[0-9]{10}"
                                    title="Ingresa 10 dígitos numéricos"
                                    required
                                />
                            </div>
                        </div>

                        <div className="animate-fade-in delay-75">
                            <h4 className="text-lg font-bold border-b border-gray-100 pb-3 mb-5">
                                Dirección de Envío
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField 
                                    label="Departamento"
                                    name="department"
                                    value={formData.address.department}
                                    onChange={handleChange('address')}
                                />
                                <InputField 
                                    label="Ciudad"
                                    name="city"
                                    value={formData.address.city}
                                    onChange={handleChange('address')}
                                />
                                <div className="sm:col-span-2">
                                    <InputField 
                                        label="Dirección (Calle/Carrera)"
                                        name="streetLine"
                                        value={formData.address.streetLine}
                                        onChange={handleChange('address')}
                                        placeholder="Ej: Calle 100 # 15-20"
                                    />
                                </div>
                                <InputField 
                                    label="Barrio"
                                    name="neighborhood"
                                    value={formData.address.neighborhood}
                                    onChange={handleChange('address')}
                                />
                                <InputField 
                                    label="Info. Adicional"
                                    name="additionalInfo"
                                    value={formData.address.additionalInfo}
                                    onChange={handleChange('address')}
                                    placeholder="Apto, Torre, Oficina..."
                                />
                                <InputField 
                                    label="Código Postal"
                                    name="zipCode"
                                    value={formData.address.zipCode}
                                    onChange={handleChange('address')}
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <SecondaryBtn 
                                type="submit" 
                                disabled={isSaving}
                                className={`w-full sm:w-auto px-10 ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                {isSaving ? 'Guardando...' : 'Actualizar Datos'}
                            </SecondaryBtn>
                        </div>
                    </form>
                </div>
            )}
            {showSuccessModal && <Modal text="Informacion actualizada con exito" onClose={()=> setShowSuccessModal(false)}/>}
            {showErrorModal && <Modal text="Ocurrio un error en el envio. Asegurate de proporcionar toda la informacion e intenta de nuevo" onClose={()=> setShowErrorModal(false)}/>}
        </section>
    )
}