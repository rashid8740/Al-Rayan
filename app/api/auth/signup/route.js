import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Here, you would typically:
    // 1. Validate the input
    // 2. Check if the user already exists
    // 3. Hash the password
    // 4. Save the user to your database

    // For now, we'll just log the details and return a success response
    console.log("New user:", { name, email, password });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
