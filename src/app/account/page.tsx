import { getProducts } from "@/actions/products";
import { auth } from "@/lib/auth";

export default async function Page() {
    const session = await auth();

    const products = await getProducts();

    return (
        <>
            <div className="flex gap-1 sm:flex-wrap">
                <section className="relative col-span-1 mx-auto w-auto overflow-hidden rounded-2xl bg-blue-900 sm:min-h-48 sm:w-full lg:col-span-3">
                    <div className="relative h-full overflow-hidden [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl">
                        <div className="h-full px-4 py-10 sm:px-10">
                            <div className='pointer-events-none absolute inset-0 size-full scale-[1.2] bg-[url("/noise.webp")] bg-[size:30%] opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]' />
                            <div className="max-w-sm">
                                <h2 className="max-w-sm text-balance  text-left text-base font-semibold tracking-[-0.015em] text-white md:max-w-lg md:text-xl lg:text-3xl">
                                    Streamline Your SaaS Development with Nextify’s Starter Kit.
                                </h2>
                                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                    Our starter kit embodies this expertise, empowering both our team and clients to
                                    build high-quality SaaS services faster and easier.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {session?.user.plan === 0
                ? products.map((product) => (
                      <div key={product.priceId}>
                          <a href={`${product.link}?prefilled_email=${session?.user.email}`}>{product.priceId}</a>
                          <h2>{product.price}</h2>
                          <p>{product.duration}</p>
                      </div>
                  ))
                : null}
        </>
    );
}
