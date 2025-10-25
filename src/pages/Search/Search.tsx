import { useEffect, useState } from "react";
import { Filter, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import CardDoctor from "@/components/common/CardDoctor";
import type { IDoctor } from "@/types";
import { getDoctors } from "@/api/doctors/doctors";
import { Loader } from "@/components/common/Loader";
import { getSpecialists } from "@/api/specialities/specialities";
import { useFavourites } from "@/hooks/useFavourite";
import GoBackButton from "@/components/common/GoBackButton";
import NoData from "@/components/common/NoData";

const Search = () => {
<<<<<<< HEAD
    const navigate = useNavigate();

    const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [specialties, setSpecialties] = useState<string[]>([]);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
        []
    );
    const [selectedGender, setSelectedGender] = useState<
        "male" | "female" | ""
    >("");
    const [sortBy, setSortBy] = useState<
        "price_asc" | "price_desc" | "recommend" | ""
    >("");
    const [available, setAvailable] = useState<("today" | "tomorrow")[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermDebounced] = useDebounce(searchTerm, 1000);
    const [filterOpen, setFilterOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 6;
    const { toggleFavourite } = useFavourites();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoadingSpecialties(true);
                const dataSpecialties: string[] = await getSpecialists();
                setSpecialties(dataSpecialties);
            } catch (error) {
                console.error("Error fetching doctors specialists:", error);
            } finally {
                setIsLoadingSpecialties(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoadingDoctors(true);
                const dataDoctor: IDoctor[] = await getDoctors({
                    specialty: selectedSpecialties.join(","),
                    gender: selectedGender,
                    available: available.join(",") as
                        | "today"
                        | "tomorrow"
                        | "today,tomorrow",
                    doctorName: searchTermDebounced,
                    sort: sortBy,
                });
                setDoctors(dataDoctor);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setIsLoadingDoctors(false);
            }
        };

        loadData();
    }, [
        sortBy,
        selectedGender,
        available,
        searchTermDebounced,
        selectedSpecialties,
    ]);

    const toggleSpecialty = (specialty: string) => {
        setSelectedSpecialties((prev: string[]) =>
            prev.includes(specialty)
                ? prev.filter((s) => s !== specialty)
                : [...prev, specialty]
        );
    };

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFilter}
                        className="flex items-center gap-2 px-4 py-2 border cursor-pointer border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                    >
                        <Filter size={16} />
                        <span className="text-sm text-gray-600">Filter</span>
                    </button>
                    <GoBackButton />
                </div>

                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    onClick={() => navigate("/search-map")}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors lg:ml-4"
                >
                    <MapPin size={16} />
                    <span className="text-sm text-gray-600">Map</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Sidebar Filters */}
                {filterOpen && (
                    <div className="xl:w-64 space-y-6">
                        {/* Available Date */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-3">
                                Available Date
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        onChange={(e) =>
                                            setAvailable((prev) =>
                                                e.target.checked
                                                    ? [...prev, "today"]
                                                    : prev.filter(
                                                          (item) =>
                                                              item !== "today"
                                                      )
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Today
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        onChange={(e) =>
                                            setAvailable((prev) =>
                                                e.target.checked
                                                    ? [...prev, "tomorrow"]
                                                    : prev.filter(
                                                          (item) =>
                                                              item !==
                                                              "tomorrow"
                                                      )
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Tomorrow
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-3">
                                Gender
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setSelectedGender(
                                            selectedGender === "male"
                                                ? ""
                                                : "male"
                                        )
                                    }
                                    className={`px-4 py-2 rounded-full text-sm border transition-colors capitalize ${
                                        selectedGender === "male"
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    Male
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedGender(
                                            selectedGender === "female"
                                                ? ""
                                                : "female"
                                        )
                                    }
                                    className={`px-4 py-2 rounded-full text-sm border transition-colors capitalize ${
                                        selectedGender === "female"
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    Female
                                </button>
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-3">
                                Sort
                            </h3>
                            <select
                                title="Sort"
                                value={sortBy}
                                defaultValue=""
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value as
                                            | "price_asc"
                                            | "price_desc"
                                            | "recommend"
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value="">All</option>
                                <option value="recommend">
                                    Most recommended
                                </option>
                                <option value="price_asc">
                                    Price low to high
                                </option>
                                <option value="price_desc">
                                    Price high to low
                                </option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1">
                    {/* Specialties */}
                    {isLoadingSpecialties ? (
                        <Loader
                            size={"xxl"}
                            className="w-10 h-10 animate-spin text-primary mx-auto"
                        />
                    ) : (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Choose Specialities
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {specialties.map((specialty: string) => (
                                    <button
                                        key={specialty}
                                        onClick={() =>
                                            toggleSpecialty(specialty)
                                        }
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                                            selectedSpecialties.includes(
                                                specialty
                                            )
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {specialty === "Dentist" && "🦷"}
                                        {specialty === "Cardiologist" && "❤️"}
                                        {specialty === "ENT" && "👂"}
                                        {specialty === "Neurologist" && "🧠"}
                                        {specialty === "General Practitioner" &&
                                            "👨‍⚕️"}
                                        {specialty === "Ophthalmologist" &&
                                            "👁️"}
                                        {specialty === "Pulmonologist" && "🫁"}
                                        <span className="text-sm">
                                            {specialty}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isLoadingDoctors ? (
                        <Loader
                            size={"xxl"}
                            className="w-10 h-10 animate-spin text-primary mx-auto"
                        />
                    ) : !isLoadingDoctors && doctors.length === 0 ? (
                        <NoData msg="Cannot find doctors" />
                    ) : (
                        <>
                            {/* Doctor Cards Grid */}
                            <div
                                className={`grid grid-cols-1 md:grid-cols-2 ${
                                    !filterOpen ? "xl:grid-cols-3" : ""
                                } gap-6 mb-8`}
                            >
                                {currentDoctors.map((doctor) => (
                                    <CardDoctor
                                        key={doctor.id}
                                        doctor={doctor}
                                        onToggleFavourite={() =>
                                            toggleFavourite(doctor.id)
                                        }
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    type="button"
                                    title="Previous"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 cursor-pointer"
                                >
                                    Prev
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            type="button"
                                            title={`Page ${index + 1}`}
                                            key={index + 1}
                                            onClick={() =>
                                                handlePageChange(index + 1)
                                            }
                                            className={`px-4 py-2 border rounded-lg cursor-pointer ${
                                                currentPage === index + 1
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-white text-gray-600 border-gray-300"
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    title="Next"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
=======
  const navigate = useNavigate();

  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">(
    ""
  );
  const [sortBy, setSortBy] = useState<
    "price_asc" | "price_desc" | "recommend" | ""
  >("");
  const [available, setAvailable] = useState<("today" | "tomorrow")[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const [filterOpen, setFilterOpen] = useState(false);
  const limit = 9;
  const [offset, setOffset] = useState(0);

  const { toggleFavourite } = useFavourites();

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataSpecialties: string[] = await getSpecialists();
        setSpecialties(dataSpecialties);
      } catch (error) {
        console.error("Error fetching doctors specialists:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingDoctors(true);
        const response = await getDoctors({
          specialty: selectedSpecialties.join(","),
          gender: selectedGender,
          available: available.join(",") as
            | "today"
            | "tomorrow"
            | "today,tomorrow",
          doctorName: searchTermDebounced,
          sort: sortBy,
          limit,
          offset,
        });

        setDoctors(response.doctors);
        setTotalDoctors(response.count);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoadingDoctors(false);
      }
    };

    loadData();
  }, [
    sortBy,
    selectedGender,
    available,
    searchTermDebounced,
    selectedSpecialties,
    limit,
    offset,
  ]);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev: string[]) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleFilter}
            className="flex items-center gap-2 px-4 py-2 border cursor-pointer border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm text-gray-600">Filter</span>
          </button>
          <GoBackButton />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => navigate("/search-map")}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors lg:ml-4"
        >
          <MapPin size={16} />
          <span className="text-sm text-gray-600">Map</span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar Filters */}
        {filterOpen && (
          <div className="xl:w-64 space-y-6">
            {/* Available Date */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Available Date</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) =>
                      setAvailable((prev) =>
                        e.target.checked
                          ? [...prev, "today"]
                          : prev.filter((item) => item !== "today")
                      )
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">Today</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) =>
                      setAvailable((prev) =>
                        e.target.checked
                          ? [...prev, "tomorrow"]
                          : prev.filter((item) => item !== "tomorrow")
                      )
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">Tomorrow</span>
                </label>
              </div>
            </div>

            {/* Gender */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Gender</h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedGender(selectedGender === "male" ? "" : "male")
                  }
                  className={`px-4 py-2 rounded-full text-sm border transition-colors capitalize ${
                    selectedGender === "male"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() =>
                    setSelectedGender(
                      selectedGender === "female" ? "" : "female"
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm border transition-colors capitalize ${
                    selectedGender === "female"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Sort</h3>
              <select
                title="Sort"
                value={sortBy}
                defaultValue=""
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "price_asc" | "price_desc" | "recommend"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All</option>
                <option value="recommend">Most recommended</option>
                <option value="price_asc">Price low to high</option>
                <option value="price_desc">Price high to low</option>
              </select>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Specialties */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Choose Specialities
            </h2>
            <div className="flex flex-wrap gap-3">
              {specialties.map((specialty: string) => (
                <button
                  key={specialty}
                  onClick={() => toggleSpecialty(specialty)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                    selectedSpecialties.includes(specialty)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {specialty === "Dentist" && "🦷"}
                  {specialty === "Cardiologist" && "❤️"}
                  {specialty === "ENT" && "👂"}
                  {specialty === "Neurologist" && "🧠"}
                  {specialty === "General Practitioner" && "👨‍⚕️"}
                  {specialty === "Ophthalmologist" && "👁️"}
                  {specialty === "Pulmonologist" && "🫁"}
                  <span className="text-sm">{specialty}</span>
                </button>
              ))}
            </div>
          </div>

          {isLoadingDoctors ? (
            <div className="flex justify-center items-center h-screen">
              <Loader
                size={"xxl"}
                className="w-20 h-20 animate-spin text-primary mx-auto"
              />
            </div>
          ) : !isLoadingDoctors && doctors.length === 0 ? (
            <NoData msg="Cannot find doctors" />
          ) : (
            <>
              {/* Doctor Cards Grid */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 ${
                  !filterOpen ? "xl:grid-cols-3" : ""
                } gap-6 mb-8`}
              >
                {doctors.map((doctor) => (
                  <CardDoctor
                    key={doctor.id}
                    doctor={doctor}
                    onToggleFavourite={() => toggleFavourite(doctor.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  type="button"
                  title="Previous"
                  onClick={() => setOffset(offset - limit)}
                  disabled={offset === 0}
                  className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                {Array.from(
                  { length: Math.ceil(totalDoctors / limit) },
                  (_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setOffset(index * limit)}
                      className={`px-4 py-2 border rounded-lg cursor-pointer ${
                        offset === index * limit
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  type="button"
                  title="Next"
                  onClick={() => setOffset(offset + limit)}
                  disabled={offset + limit >= totalDoctors}
                  className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};

export default Search;
