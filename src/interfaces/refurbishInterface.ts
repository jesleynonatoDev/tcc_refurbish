export interface RefurbishInterface extends CreateAt {
    email: string;
    firstName: string;
    lastName: string;
    refurbishName: string;
}

export interface CreateAt {
    date: Date
}