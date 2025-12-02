import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="space-y-6">
      {/* Main heading + intro text */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Find your new best friend
        </h1>
        <p className="mt-2 text-slate-700 max-w-2xl text-sm">
          Pet Adoption Services helps connect loving families with adoptable pets from
          local shelters. Browse available pets, learn their stories, and start
          an adoption application online.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/pets"
          className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
        >
          Browse available pets
        </Link>

        <Link
          to="/adopt"
          className="px-4 py-2 rounded-md border border-slate-300 text-sm text-slate-800"
        >
          Start an adoption application
        </Link>
      </div>

      {/* Three simple info cards */}
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold text-slate-900 text-sm">
            Search by species & breed
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Filter by dogs, cats, and other animals, and narrow down by size and
            age.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold text-slate-900 text-sm">
            View medical & behavior notes
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Each pet includes basic medical and temperament info to help you
            decide.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold text-slate-900 text-sm">
            Simple adoption workflow
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Submit your info online and the shelter will contact you for next
            steps.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
