import { auth } from '@/lib/auth/server';
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data: session } = await auth.getSession();

  return (
    <>
      <Script
        async
        src="https://pylynxosproject1.statuspage.io/embed/script.js"
        strategy="afterInteractive"
      />
        
      <Script
        id="intercom-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var w=window;
              var ic=w.Intercom;
              if(typeof ic==="function"){
                ic('reattach_activator');
                ic('update', w.intercomSettings);
              }else{
                var d=document;
                var i=function(){i.c(arguments);};
                i.q=[];
                i.c=function(args){i.q.push(args);};
                w.Intercom=i;
                var l=function(){
                  var s=d.createElement('script');
                  s.type='text/javascript';
                  s.async=true;
                  s.src='https://intercom.io{APP_ID}';
                  var x=d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s,x);
                };
                if(document.readyState==='complete'){
                  l();
                }else{
                  if(w.attachEvent){
                    w.attachEvent('onload',l);
                  }else{
                    w.addEventListener('load',l,false);
                  }
                }
              }
            })();

            window.intercomSettings = {
              app_id: "lazx153i"
            };
            
            if (window.Intercom) {
              window.Intercom('boot', window.intercomSettings);
            }
          `,
        }}
      />
    
      <Script
        async
        src={"https://googlesyndication.com" + process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Analytics />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex flex-col">
        <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🦊</div>
            <span className="text-xl font-semibold tracking-wide">PyLynx</span>
          </div>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-300">
                {session.user.name || session.user.email}
              </span>
              <a
                href="/dashboard"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition"
              >
                Dashboard
              </a>
            </div>
          ) : (
            <a
              href="/profile"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
            >
              Log In
            </a>
          )}
        </header>

        <section className="flex flex-col items-center justify-center flex-1 p-10 border-b border-white/10">
          <h2 className="text-4xl font-bold mb-4 tracking-wide">Get Started</h2>

          <p className="text-zinc-400 max-w-xl text-center mb-8">
            Boot into the PyLynx OS demo and experience the fox‑core boot chain,
            mythic desktop environment, and youth‑powered app system.  
            Built for exploration. Designed for remixing.
          </p>

          <a
            href="/demo"
            className="px-8 py-3 rounded-xl text-lg font-semibold bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(128,0,255,0.4)] transition-all"
          >
            Launch Demo
          </a>
        </section>

        <section className="flex flex-col items-center justify-center flex-1 p-10">
          <h2 className="text-4xl font-bold mb-4 tracking-wide">
            For Youth Remixers
          </h2>

          <p className="text-zinc-400 max-w-xl text-center">
            PyLynx is built to be hacked, remixed, and reshaped.  
            Dive into the source code, customize the UI, rewrite the bootloader,
            or build your own apps.  
            Every part of PyLynx is designed to be teachable and remixable.
          </p>
        </section>

        <footer className="mt-12 flex justify-center pb-12">
          <a
            href="https://videos.deniskuizinas.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/image.png"
              alt="Watch my Open.Video channel"
              width={600}
              height={340}
              className="rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition"
            />
          </a>
        </footer>
      </div>
    </>
  );
}