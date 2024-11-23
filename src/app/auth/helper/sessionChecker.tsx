import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

interface SessionCheckerProps {
    children: React.ReactNode;
}

const SessionChecker: React.FC<SessionCheckerProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const session = await getSession();

            if(!session) {
                router.push("/auth/signin");
            } else {
                setLoading(false);
            }
        }

        checkSession();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default SessionChecker;