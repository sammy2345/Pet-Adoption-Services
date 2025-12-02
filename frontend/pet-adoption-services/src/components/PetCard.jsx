// PetCard expects a "pet" object shaped like your DB + joins:
// {
//   pet_id, name, age, gender, location, status,
//   species, breed, shelter_name, about
// }

function PetCard({ pet }) {
  const {
    pet_id,
    name,
    species,
    breed,
    age,
    gender,
    location,
    status,
    shelter_name,
    about,
  } = pet;

  return (
    <article
      className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
      data-pet-id={pet_id}
    >
      {/* Placeholder for photo */}
      <div className="w-24 h-24 bg-slate-200 rounded-md flex items-center justify-center text-xs text-slate-500">
        Photo
      </div>

      {/* Text info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-slate-900">
          {name}{" "}
          <span className="text-xs font-normal text-slate-500">
            · {species}
          </span>
        </h2>

        <p className="text-sm text-slate-700">
          {breed} • {age} years • {gender}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          Location: {location || "Unknown"} · Shelter: {shelter_name}
        </p>

        {about && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-2">
            {about}
          </p>
        )}

        {/* Status badge */}
        <div className="mt-3">
          <span
            className={
              status === "Available"
                ? "inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs"
                : status === "Pending"
                ? "inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs"
                : "inline-block px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs"
            }
          >
            {status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
