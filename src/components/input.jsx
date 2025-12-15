export function InputComp({labelName, placeholder, type}){
    return(
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{labelName}</label>
            <input 
            type={type} 
            placeholder={placeholder} 
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-950" 
            />
        </div>
    );
}