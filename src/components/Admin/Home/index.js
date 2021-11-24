import moment from "moment";

function Index(props) {
  const { events } = props;

  const filtro = events.filter(
    (ev) =>
      moment(ev.start).format("MMM Do YY") === moment().format("MMM Do YY")
  );
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Citas de hoy
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {/* inicio*/}
            {filtro.map((evento) => (
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={evento._id}>
                <div className="h-full flex items-center border-gray-400 border p-4 rounded-lg">
                  <div className="flex-grow">
                    <span>{moment(evento.start).format("h:mm:ss")}</span>
                    <h2 className="text-gray-900 title-font font-medium">
                      {evento.name}
                    </h2>
                    <p className="text-gray-500">{evento.notes}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* fin*/}
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
