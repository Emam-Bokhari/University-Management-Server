
export type Student = {
    id: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    },
    profileImage?: string;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "AB+" | "AB-" | "B+" | "B-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    gurdian: {
        fatherName: string;
        fatherOccupation: string;
        fatherContactNo: string;
        motherName: string;
        motherOccupation: string;
        matherContactNo: string;
    },
    localGurdian: {
        name: string;
        occupation: string;
        contactNo: string;
        address: string;
    },
    isActive: "active" | "blocked"
}