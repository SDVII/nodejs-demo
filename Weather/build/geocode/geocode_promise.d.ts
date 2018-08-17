declare class GeocodeAxios {
    geocodeAddress(address: string): Promise<{}>;
    temperature(lat: string, lng: string): Promise<{}>;
}
export { GeocodeAxios };
