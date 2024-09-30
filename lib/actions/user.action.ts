"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model"; // Ensure the correct model is imported
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { CreateUserParams, UpdateUserParams } from "@/lib/types"; // Import types if they are defined in a separate file

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return newUser.toObject(); // Convert Mongoose document to plain object
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");
    return user.toObject();
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return updatedUser.toObject();
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? deletedUser.toObject() : null;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");
    return updatedUserCredits.toObject();
  } catch (error) {
    handleError(error);
    throw error;
  }
}
