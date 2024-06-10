import React from "react";
// import "./Map.css";
import GoogleMapReact from "google-map-react";


const AnyReactComponent = ({ text }) => <div>{text}</div>;


const Map = () => {
  const defaultProps = {
    center: {
      lat: 11.3970071,
      lng: 5.4847741,
    },
    zoom: 8,
  };

  return (
    <section className="container container__map" id="map">
      <div className="row" style={{ height: '100vh', width: '100%' }}>
        {/* <div className='col-12 map'></div> */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAMDoXjU2XFWN1vKFPxAVimw_teBjVBpQA" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={11.3970071} lng={5.4847741} text="Google Map" />
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default Map;
