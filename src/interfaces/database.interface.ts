export default interface DatabaseInterface {

    createConnection(port: number): Promise<void>;
}