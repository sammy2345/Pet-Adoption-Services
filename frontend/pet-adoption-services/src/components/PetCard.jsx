// PetCard shows ONE pet's info (name, breed, age, etc.)

const PetCard = ({ pet }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
      {/* Placeholder for photo maybe later ???*/}
      <div className="w-24 h-24 bg-slate-200 rounded-md flex items-center justify-center text-xs text-slate-500">
        Photo
      </div>

      {/* Text info about the pet */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-slate-900">
          {pet.name}{" "}
          <span className="text-xs font-normal text-slate-500">
            · {pet.species}
          </span>
        </h2>

        <p className="text-sm text-slate-700">
          {pet.breed} • {pet.age} years • {pet.gender}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          Shelter: {pet.shelterName}
        </p>

        {/* Status badges */}
        <div className="mt-3 flex gap-2">
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs">
            {pet.status}
          </span>

          {pet.isSpecial && (
            <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs">
              Special needs
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default PetCard;
