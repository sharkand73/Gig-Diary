export interface KeyValuePair<T> {
    Key: number | string;
    Value: T;
}

export interface Stats {
    GigCount: number;
    EarningsThisYear: number;
    EarningsByMonth: KeyValuePair<number>[];
    AverageMonthly: number;
    MonthlyGigTally: KeyValuePair<number>[];
    PayerCount: number;
    EarningsByPayer: KeyValuePair<number>[];
}