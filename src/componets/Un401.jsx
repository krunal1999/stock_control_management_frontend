import img from "../img/un401.svg";
const Un401 = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* image source -   https://storyset.com/illustration/401-error-unauthorized/rafiki */}
        <img
          src={img}
          alt="401 page"
          style={{ height: "100%", width: "auto", margin: "0 auto" }}
        />
      </div>
    </>
  );
};

export default Un401;
