import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabase-client";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const signin = () => {
  const user = useUser();
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  if (!user) {
    return (
      <div className="w-full h-screen px-6 py-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
          redirectTo={getURL()}
          magicLink={true}
        />
      </div>
    );
  }
  return <div>loading...</div>;
};

export default signin;
