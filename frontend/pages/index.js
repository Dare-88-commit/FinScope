
import Navbar from '../components/Navbar'; 
// import Footer from '../components/Footer'

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* The component usage */}
        <Navbar />
      </div>
      <main className="pt-16">
        <div className="bg-white min-h-screen">
          {/* HERO SECTION */}
          <section className="w-[95%] h-[60vh] mx-auto mt-10 bg-white rounded-3xl shadow-md overflow-hidden flex flex-col items-center justify-center text-center relative bg-[url('/Container.png')] bg-cover bg-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
              PROTECTING{" "}
              <span className="underline decoration-blue-900">YOURSELF</span>
              <br />
              has never been this easy.
            </h1>

            <button  className=" cursor-pointer mt-6 px-8 py-3 rounded-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium transition shadow-sm">
              START NOW
            </button>
          </section>

          {/* STEPS SECTION */}
          <section className="mt-15 text-center ">
            <h2 className="text-5xl font-semibold text-gray-900">
              Get Started in 3 easy steps
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              🔹 Simple protection for everyday people
            </p>

            <div className="mt-16 w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-70 h-70 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                  <img src="/clipboard.svg" className="w-24 h-24" alt="" />
                  <p className="text-[#003366] text-sm w-35 mt-2">
                  Paste or upload a message that looks sketchy.
                </p>
                </div>
                
                
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-70 h-70 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                  <img src="/vector.svg" className="w-24 h-24" alt="" />
                  <p className="text-[#003366] text-sm w-35 mt-2">
                  AI Analysis<br></br>We scan patterns, domains and language for threats.
                </p>
                </div>
                
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-70 h-70 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                  <img src="/clock.svg" className="w-24 h-24" alt="" />
                  <p className="text-[#003366] text-sm w-35 mt-2">
                  3. Risk Score<br></br>FinScope computes the risk and advises next steps.
                </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;