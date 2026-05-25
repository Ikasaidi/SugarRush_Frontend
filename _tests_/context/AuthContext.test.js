import React, { useContext } from "react";
import { Text, Pressable } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import AuthContext, { AuthProvider } from "../../src/context/AuthContext";
import API from "../../src/services/api";
import { TokenService } from "../../src/services/tokenService";

jest.mock("../../src/services/api", () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

jest.mock("../../src/services/tokenService", () => ({
    TokenService: {
        getToken: jest.fn(),
        saveToken: jest.fn(),
        clearToken: jest.fn(),
    },
}));

const TestComponent = () => {
    const {
        isLoggedIn,
        user,
        token,
        loading,
        login,
        logout,
        register,
        refreshUser,
    } = useContext(AuthContext);

    return (
        <>
            <Text>{loading ? "loading" : "not-loading"}</Text>
            <Text>{isLoggedIn ? "logged-in" : "logged-out"}</Text>
            <Text>{token || "no-token"}</Text>
            <Text>{user?.email || "no-user"}</Text>
            <Text>{user?.wallet?.paid_ticket_balance ?? "no-paid"}</Text>

            <Pressable onPress={() => login(" TEST@EMAIL.COM ", " Password1! ")}>
                <Text>login</Text>
            </Pressable>

            <Pressable onPress={logout}>
                <Text>logout</Text>
            </Pressable>

            <Pressable
                onPress={() =>
                    register({
                        username: " issa ",
                        email: " TEST@EMAIL.COM ",
                        password: " Password1! ",
                        fname: " Issa ",
                        lname: " Test ",
                        phone: " 5141234567 ",
                        address: " Montreal ",
                        user_type: "student",
                    })
                }
            >
                <Text>register</Text>
            </Pressable>

            <Pressable onPress={refreshUser}>
                <Text>refresh</Text>
            </Pressable>
        </>
    );
};

describe("AuthContext", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
        console.log.mockRestore();
    });

    test("should start logged out when no saved token", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(getByText("logged-out")).toBeTruthy();
        });
    });

    test("should restore session when token exists", async () => {
        TokenService.getToken.mockResolvedValueOnce("saved-token");

        API.get
            .mockResolvedValueOnce({
                data: {
                    user: {
                        email: "restore@email.com",
                    },
                },
            })
            .mockResolvedValueOnce({
                data: {
                    wallet: {
                        free_ticket_balance: 1,
                        paid_ticket_balance: 2,
                    },
                    purchases: [],
                    stats: {},
                },
            });

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(getByText("logged-in")).toBeTruthy();
            expect(getByText("restore@email.com")).toBeTruthy();
            expect(getByText("saved-token")).toBeTruthy();
        });
    });

    test("should clear token if restore session fails", async () => {
        TokenService.getToken.mockResolvedValueOnce("bad-token");
        API.get.mockRejectedValueOnce(new Error("restore failed"));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(TokenService.clearToken).toHaveBeenCalled();
        });
    });

    test("should register user", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        API.post.mockResolvedValueOnce({
            data: {
                success: true,
            },
        });

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("register"));

        await waitFor(() => {
            expect(API.post).toHaveBeenCalledWith("/auth/register", {
                username: "issa",
                email: "test@email.com",
                password: "Password1!",
                user_type: "student",
                fname: "Issa",
                lname: "Test",
                phone: "5141234567",
                address: "Montreal",
            });
        });
    });



    test("should logout user", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("logout"));

        await waitFor(() => {
            expect(TokenService.clearToken).toHaveBeenCalled();
            expect(getByText("logged-out")).toBeTruthy();
        });
    });

    test("should handle logout error", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);
        TokenService.clearToken.mockRejectedValueOnce(new Error("logout failed"));

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("logout"));

        await waitFor(() => {
            expect(TokenService.clearToken).toHaveBeenCalled();
        });
    });

    test("should refresh user", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        API.get
            .mockResolvedValueOnce({
                data: {
                    user: {
                        email: "refresh@email.com",
                        purchases: [],
                        stats: {},
                    },
                },
            })
            .mockResolvedValueOnce({
                data: {
                    wallet: {
                        free_ticket_balance: 3,
                        paid_ticket_balance: 4,
                    },
                    purchases: [],
                    stats: {},
                },
            });

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("refresh"));

        await waitFor(() => {
            expect(getByText("refresh@email.com")).toBeTruthy();
        });
    });

    test("should handle refresh user when no user returned", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        API.get.mockResolvedValueOnce({
            data: {
                user: null,
            },
        });

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("refresh"));

        await waitFor(() => {
            expect(API.get).toHaveBeenCalledWith("/users/me");
        });
    });

    test("should handle refresh user error", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);
        API.get.mockRejectedValueOnce(new Error("refresh failed"));

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("refresh"));

        await waitFor(() => {
            expect(API.get).toHaveBeenCalledWith("/users/me");
        });
    });

    test("should use purchases fallback when wallet endpoint fails", async () => {
        TokenService.getToken.mockResolvedValueOnce(null);

        API.post.mockResolvedValueOnce({
            data: {
                token: "abc123",
                user: {
                    email: "fallback@email.com",
                    purchases: [
                        {
                            quantity: 3,
                            total_amount: 20,
                        },
                    ],
                },
            },
        });

        API.get.mockRejectedValueOnce(new Error("wallet failed"));

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.press(getByText("login"));

        await waitFor(() => {
            expect(getByText("fallback@email.com")).toBeTruthy();
            expect(getByText("3")).toBeTruthy();
        });
    });
});