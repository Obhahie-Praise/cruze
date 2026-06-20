interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Product Detail: {slug}</h1>
      <p className="text-zinc-500 mt-2 font-mono text-sm">/product/{slug}</p>
    </main>
  );
}
