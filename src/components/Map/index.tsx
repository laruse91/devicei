import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const Map: React.FC= () => {
    const location = {lat: 55.748942, lng: 37.535166}
    return (
        <>
            <GoogleMap defaultZoom={17} defaultCenter={location}>
                <Marker position={location}/>
                </GoogleMap>
        </>
    )
}

export const GMap = withScriptjs(withGoogleMap(Map))


