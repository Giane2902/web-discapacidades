import CalendarComp from "../../components/Public/Reserve/CalendarComp";
import Navbar from "../../components/Public/Navbar";
import Footer from "../../components/Public/Footer";

function ReservePage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto container mt-5 sm:mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Reservar Cita
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify.
          </p>
        </div>
        <div
          className="bigCalendar-container"
          style={{ height: "100vh", margin: "10px" }}
        >
          <CalendarComp />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReservePage;
