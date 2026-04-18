
export function CheckoutStepper({ currentStep }) {
  const steps = [
    { id: 1, label: "Datos de envío", shortLabel: "Envío" },
    { id: 2, label: "Resumen",        shortLabel: "Resumen" },
    { id: 3, label: "Pago",           shortLabel: "Pago" },
  ];

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          /*
            Is Completed, nos sirve para saber si el paso anterior esta comepletado,
            is active sirve para indicar que el paso en el que estamos esta activo
            is last sirve para saber cual es el ultimo paso para asi no dibujar ninguna linea despues de este
          */
          const isCompleted = currentStep > step.id;
          const isActive    = currentStep === step.id;
          const isLast      = index === steps.length - 1;

          /*
            CONDICIONALES:
            1. Circulo
              - Si es completed (redonda verde texto blanco)
              - Si es activo (borde verde texto verde)
            2. Icono
              - Si es completed, se cambia el numero por el icono
              - Si no es completed, se pone el id (numero)
            3. Linea divisioria entre pasos
              - Si no es el ultimo (añadir la linea)
          */
          return (
            <div key={step.id} className="flex items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    text-sm font-bold border-2 transition-all duration-300
                    ${isCompleted
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : isActive
                        ? "bg-white border-emerald-600 text-emerald-600 shadow-md shadow-emerald-100"
                        : "bg-white border-gray-200 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                <span
                  className={`
                    text-xs font-medium hidden sm:block transition-colors duration-200
                    ${isActive ? "text-emerald-700" : isCompleted ? "text-emerald-600" : "text-gray-400"}
                  `}
                >
                  {step.label}
                </span>
                <span
                  className={`
                    text-xs font-medium sm:hidden transition-colors duration-200
                    ${isActive ? "text-emerald-700" : isCompleted ? "text-emerald-600" : "text-gray-400"}
                  `}
                >
                  {step.shortLabel}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`
                    h-0.5 w-16 sm:w-24 mx-2 mb-5 rounded-full transition-all duration-500
                    ${isCompleted ? "bg-emerald-500" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}