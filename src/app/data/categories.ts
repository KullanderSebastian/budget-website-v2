export const categories = {
    income: {
        label: "Income",
        type: "income",
        description: "All sources of income.",
        sources: {
            salary: { label: "Salary (After tax)", recurring: true },
            freelance: { label: "Freelance/Contract Work", recurring: false },
            rental: { label: "Rental Income", recurring: true },
            investments: { label: "Investment Income", recurring: true },
            pension: { label: "Pension/Retirement Income", recurring: true },
            benefits: { label: "Government Benefits", recurring: true },
            other: { label: "Other Income", recurring: false },
        },
    },
    fixedExpenses: {
        label: "Fixed Expenses",
        type: "expense",
        priority: "high",
        description: "Regular, predictable expenses.",
        sources: {
            housing: {
                label: "Housing",
                subcategories: {
                    rent: "Rent",
                    mortgage: "Mortgage",
                    propertyTax: "Property Tax",
                },
                recurring: true,
            },
            utilities: { label: "Utilities (Electricity, Water, Gas)", recurring: true },
            internet: { label: "Internet/Broadband", recurring: true },
            phone: { label: "Phone Bills", recurring: true },
            insurance: { label: "Insurance (Health, Home, Life)", recurring: true },
            subscriptions: { label: "Subscriptions (Streaming, Gym)", recurring: true },
            other: { label: "Other Fixed Costs", recurring: false },
        },
    },
    variableExpenses: {
        label: "Variable Expenses",
        type: "expense",
        priority: "medium",
        description: "Expenses that vary month-to-month.",
        sources: {
            groceries: { label: "Groceries", recurring: true },
            dining: { label: "Dining Out", recurring: false },
            transportation: { label: "Transportation (Fuel, Public Transit, Parking)", recurring: true },
            clothing: { label: "Clothing", recurring: false },
            medical: { label: "Medical Expenses", recurring: false },
            other: { label: "Other Variable Costs", recurring: false },
        },
    },
    savings: {
        label: "Savings & Investments",
        type: "saving",
        priority: "high",
        description: "Money set aside for the future.",
        sources: {
            emergency: { label: "Emergency Fund", recurring: true },
            retirement: { label: "Retirement Savings", recurring: true },
            investments: { label: "Investments (Stocks, Bonds, Crypto)", recurring: true },
            education: { label: "Education Fund", recurring: true },
            other: { label: "Other Savings", recurring: false },
        },
    },
    debt: {
        label: "Debt & Loans",
        type: "debt",
        priority: "high",
        description: "Money owed or repayments.",
        sources: {
            creditCard: { label: "Credit Card Payments", recurring: true },
            studentLoan: { label: "Student Loan Repayments", recurring: true },
            personalLoan: { label: "Personal Loan Repayments", recurring: true },
            mortgage: { label: "Mortgage Payments", recurring: true },
            autoLoan: { label: "Auto Loan Payments", recurring: true },
            other: { label: "Other Debt Payments", recurring: false },
        },
    },
    discretionary: {
        label: "Discretionary Spending",
        type: "expense",
        priority: "low",
        description: "Optional spending for leisure or hobbies.",
        sources: {
            entertainment: { label: "Entertainment (Movies, Music, Games)", recurring: false },
            hobbies: { label: "Hobbies (Crafts, Sports, etc.)", recurring: false },
            travel: { label: "Vacations/Travel", recurring: false },
            gifts: { label: "Gifts/Charity", recurring: false },
            other: { label: "Other Discretionary Spending", recurring: false },
        },
    },
    education: {
        label: "Education",
        type: "expense",
        priority: "medium",
        description: "Costs related to education or training.",
        sources: {
            tuition: { label: "Tuition Fees", recurring: false },
            schoolSupplies: { label: "School Supplies", recurring: false },
            onlineCourses: { label: "Online Courses", recurring: false },
            other: { label: "Other Education Costs", recurring: false },
        },
    },
    healthcare: {
        label: "Healthcare",
        type: "expense",
        priority: "high",
        description: "Medical and healthcare-related expenses.",
        sources: {
            healthInsurance: { label: "Health Insurance", recurring: true },
            doctorVisits: { label: "Doctor Visits", recurring: false },
            therapy: { label: "Therapy", recurring: false },
            dentalCare: { label: "Dental Care", recurring: false },
            visionCare: { label: "Vision Care", recurring: false },
            prescriptions: { label: "Prescriptions/Medicines", recurring: false },
            other: { label: "Other Healthcare Costs", recurring: false },
        },
    },
    business: {
        label: "Business Expenses",
        type: "expense",
        priority: "medium",
        description: "Expenses related to running a business or freelancing.",
        sources: {
            officeSupplies: { label: "Office Supplies", recurring: false },
            professionalServices: { label: "Professional Services (Accountant, Lawyer)", recurring: false },
            marketing: { label: "Marketing/Advertising", recurring: false },
            travel: { label: "Business Travel", recurring: false },
            software: { label: "Software Subscriptions (e.g., Adobe, Zoom)", recurring: true },
            other: { label: "Other Business Costs", recurring: false },
        },
    },
    pets: {
        label: "Pet Expenses",
        type: "expense",
        priority: "low",
        description: "Costs related to caring for pets.",
        sources: {
            food: { label: "Pet Food", recurring: true },
            vetBills: { label: "Veterinary Bills", recurring: false },
            insurance: { label: "Pet Insurance", recurring: true },
            grooming: { label: "Grooming", recurring: false },
            other: { label: "Other Pet Costs", recurring: false },
        },
    },
    emergencies: {
        label: "Emergencies",
        type: "expense",
        priority: "high",
        description: "Unexpected expenses or emergencies.",
        sources: {
            medicalBills: { label: "Unexpected Medical Bills", recurring: false },
            repairs: { label: "Emergency Repairs (e.g., Car, Home)", recurring: false },
            other: { label: "Other Emergencies", recurring: false },
        },
    },
    custom: {
        label: "Custom Categories",
        type: "custom",
        description: "User-defined categories.",
        sources: {},
    },
};