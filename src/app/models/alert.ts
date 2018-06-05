export interface Alert {
    AlertId: number;
    AlertTime: Date;
    Severity: string;
    ClientIP: string;
    ServerIP: string;
    Protocol: string;
    ClientCountry: string;
}
