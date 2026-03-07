import { useEffect, useState } from "react";
import { LocationIcon } from "./locationIcon";


export function AddressForm({ addresses, data = {}, onChange, showEmail = false, showPhone = false, createNewAddress, onSelectAddress, shippingAddressId }) {
  // Estado que nos sirve para saber si se debe de mostrar el formulario de las direcciones o no
  const [showForm, setShowForm] = useState(false);
  // guardamos internamente los valores del formulario (tanto los de contacto como los de dirección)
  const [formValues, setFormValues] = useState(data);

  useEffect(()=>{
    if (addresses.length === 0) {
      setShowForm(true);
    }else{
      setShowForm(false);
    }
  }, [addresses])

  // si el padre nos cambia la data, mantenemos sincronizado el estado interno
  useEffect(() => {
    setFormValues(data);
  }, [data]);

  const createNewDirection = () =>{
    // Validación de campos obligatorios
    const requiredFields = ['calle', 'codigo_postal', 'ciudad', 'provincia'];
    const missing = requiredFields.filter(field => !formValues[field]?.trim());
    if (missing.length > 0) {
      alert(`Por favor, completa los siguientes campos obligatorios: ${missing.join(', ')}`);
      return;
    }

    // extraemos sólo los campos de dirección antes de enviarlos al contexto
    const { nombre, apellidos, email, telefono, direccionElegida, ...addr } = formValues;

    createNewAddress(addr);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormValues(prev => ({ ...prev, [field]: value }));
    if (onChange) {
      // seguimos informando al padre si nos pasó una función
      onChange(prev => ({ ...prev, [field]: value }));
    }
  };

  const cancel = () =>{
    setShowForm(false);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Nombre <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej. María"
          value={formValues.nombre || ""}
          onChange={handleChange("nombre")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                     placeholder:text-gray-300 bg-white
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Apellidos */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Apellidos <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej. García López"
          value={formValues.apellidos || ""}
          onChange={handleChange("apellidos")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                     placeholder:text-gray-300 bg-white
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Email (solo si showEmail) */}
      {showEmail && (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={formValues.email || ""}
            onChange={handleChange("email")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                       placeholder:text-gray-300 bg-white
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>
      )}

      {/* Teléfono (solo si showPhone) */}
      {showPhone && (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Teléfono <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="+34 600 000 000"
            value={formValues.telefono || ""}
            onChange={handleChange("telefono")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                       placeholder:text-gray-300 bg-white
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>
      )}
 
      {/*
        Cuando hay direcciones y no se tiene que mostrar el formulario para crear una nueva direccion,
        lo que se hace es mostrar un listado con todas las direcciones para que el usuario pueda seleccionar la que mas
        le convenga. Cuando se quiere añadir una nueva dirección, se mustra el formulario es decir el setShowForm se pone a true.

        Después tenemos otro condicional, que nos permite mostrar el formulario para crear una nueva dirección
      */}
      {/* Lista de direcciones guardadas */}
      {addresses.length > 0 && !showForm && (
        <>
          {addresses.map(addr => (
            <AddressCard key={addr._id} address={addr} onSelectAddress={onSelectAddress} isSelected={addr._id === shippingAddressId} />
          
          ))}

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="sm:col-span-2 text-emerald-600 font-medium"
          >
            + Añadir nueva dirección
          </button>
        </>
      )}

      {/* Formulario para añadir nueva dirección */}
      {showForm && (
        <>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Calle <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Calle, número, piso..."
              value={formValues.calle || ""}
              onChange={handleChange("calle")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Número / Piso
            </label>
            <input
              type="text"
              value={formValues.numero_piso || ""}
              onChange={handleChange("numero_piso")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Código Postal <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formValues.codigo_postal || ""}
              onChange={handleChange("codigo_postal")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Ciudad <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formValues.ciudad || ""}
              onChange={handleChange("ciudad")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Provincia <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formValues.provincia || ""}
              onChange={handleChange("provincia")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              País
            </label>
            <select
              value={formValues.pais || "España"}
              onChange={handleChange("pais")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              <option value="España">España</option>
              <option value="Portugal">Portugal</option>
              <option value="Francia">Francia</option>
              <option value="Italia">Italia</option>
              <option value="Alemania">Alemania</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex justify-center gap-7">
            <button
              onClick={createNewDirection}
              className="sm:col-span-2 text-emerald-600 font-medium"
            >
              + Añadir dirección
            </button>

            <button
              onClick={cancel}
              className="sm:col-span-2 text-emerald-600 font-medium"
            >
              Cancelar
            </button>
          </div>

        </>
      )}

    </div>
  );
}

function AddressCard({ address, onSelectAddress, isSelected }) {
    return (
        <button
            onClick={() => onSelectAddress(address._id)}
            className="
                w-full text-left p-4 rounded-xl border border-gray-200 bg-white
                hover:bg-gray-50 hover:border-emerald-300 hover:shadow-md
                transition-all duration-200 shadow-sm
            "
        >
            <div className="flex items-start gap-3">
                {/* Icono */}
                <div className="
                    w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0
                ">
                  <LocationIcon />
                </div>

                {/* Info dirección */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {address.calle}
                        {address.numero_piso && `, ${address.numero_piso}`}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                        {address.codigo_postal} {address.ciudad}, {address.provincia}
                    </p>
                    <p className="text-xs text-gray-500">{address.pais}</p>
                </div>

                {/* Radio visual */}
                <div className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 self-center flex items-center justify-center
                    transition-colors duration-200
                    ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 hover:border-emerald-400'}
                `}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
            </div>
        </button>
    );
}