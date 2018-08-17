declare class Geocode {
    geocodeAddress(address: string): Promise<{}>;
    temperature(lat: string, lng: string): Promise<{}>;
}
export { Geocode };
