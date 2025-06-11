"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <form action={loginAction} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '1.5rem'
            }}>Login</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <input 
                    id="email" 
                    name="email" 
                    placeholder="Email"
                    style={{
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                    }}
                />
            </div>
            {state?.errors?.email && (
                <p style={{
                    color: 'red',
                    margin: '0.25rem 0',
                    fontSize: '0.875rem'
                }}>{state.errors.email}</p>
            )}

            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    style={{
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                    }}
                />
            </div>
            {state?.errors?.password && (
                <p style={{
                    color: 'red',
                    margin: '0.25rem 0',
                    fontSize: '0.875rem'
                }}>{state.errors.password}</p>
            )}
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            disabled={pending} 
            type="submit"
            style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer',
                opacity: pending ? 0.7 : 1
            }}
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}