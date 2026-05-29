export interface PersonalInformation {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
}

export interface EducationAndEmployment {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: number;
}

export interface Socials {
    twitter: string;
    facebook: string;
    instagram: string;
}

export interface Guarantor {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
}

export interface UserProfile {
    _fName?: string;
    _lName?: string;
    _phone?: string;

    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;

    status: "Active" | "Inactive" | "Pending" | "Blacklisted" | string;
    rating: number;

    accountBalance: string;
    accountNumber: string;
    bankName: string;

    personalInformation: PersonalInformation;
    educationAndEmployment: EducationAndEmployment;
    socials: Socials;
    guarantor: Guarantor[];
}