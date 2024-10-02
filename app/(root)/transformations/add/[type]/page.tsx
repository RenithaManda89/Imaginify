import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
    const { userId } = auth();
    console.log("User ID from auth():", userId);  // Log user ID
  
    if (!userId) {
      console.log("No userId found, redirecting to /sign-in");
      redirect('/sign-in');
      return null; // Prevent further rendering
    }
  
    const user = await getUserById(userId);
    if (!user) {
      console.log("No user found, redirecting to /sign-in");
      redirect('/sign-in');
      return null; // Prevent further rendering
    }
  
    // const transformation = transformationTypes[type];
    // if (!transformation) {
    //   console.log(`Transformation type '${type}' not found, redirecting to /not-found`);
    //   redirect('/not-found');  // Redirect to a custom not-found page
    //   return null;
    // }
    const transformation = transformationTypes[type];
console.log("Transformation type found:", transformation);

if (!transformation) {
  console.log(`Transformation type '${type}' not found, redirecting to /not-found`);
  redirect('/not-found'); // Redirect to a custom not-found page
  return null;
}

  
    return (
      <>
        <Header title={transformation.title} subtitle={transformation.subTitle} />
        <section className="mt-10">
          <TransformationForm
            action="Add"
            userId={user._id}
            type={transformation.type as TransformationTypeKey}
            creditBalance={user.creditBalance}
          />
        </section>
      </>
    );
  };
  
  export default AddTransformationTypePage;
  