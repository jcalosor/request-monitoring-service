export default interface DatabaseInterface {
    createConnection(port: number, schema: string): Promise<boolean>;
}
