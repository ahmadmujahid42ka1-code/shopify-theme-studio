import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Heart,
  Menu,
  MousePointer2,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import heroImage from "@/assets/storefront-editorial.jpg";
import objectsImage from "@/assets/category-objects.jpg";
import textilesImage from "@/assets/category-textiles.jpg";
import lightingImage from "@/assets/category-lighting.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morrow Living — Thoughtful things for home" },
      {
        name: "description",
        content:
          "Discover considered home objects, tactile textiles and beautiful lighting at Morrow Living.",
      },
      { property: "og:title", content: "Morrow Living — Thoughtful things for home" },
      {
        property: "og:description",
        content: "Thoughtful home objects, color, and texture for the everyday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const buildSections = ["site-nav", "shop-hero", "shop-categories", "featured", "editorial", "site-footer"];
const categories = [
  { name: "Objects", note: "Little things, lovely details", image: objectsImage },
  { name: "Textiles", note: "A softer kind of everyday", image: textilesImage },
  { name: "Lighting", note: "A warmer point of view", image: lightingImage },
];
const builders = ["Mina · art direction", "Theo · type", "Jules · objects", "Sam · details"];

function Storefront() {
  const [building, setBuilding] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Everything");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem("morrow-intro-seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadySeen || prefersReducedMotion) {
      setActiveStep(buildSections.length - 1);
      return;
    }

    window.sessionStorage.setItem("morrow-intro-seen", "true");
    setBuilding(true);
    let nextStep = 0;

    const advance = () => {
      const sectionId = buildSections[nextStep];
      if (!sectionId) return;
      setActiveStep(nextStep);
      setProgress(Math.round(((nextStep + 1) / buildSections.length) * 100));
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      nextStep += 1;

      if (nextStep === buildSections.length) {
        if (timer.current) clearInterval(timer.current);
        setFinished(true);
        finishTimer.current = setTimeout(() => {
          setBuilding(false);
          setFinished(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      }
    };

    advance();
    timer.current = setInterval(advance, 1150);

    return () => {
      if (timer.current) clearInterval(timer.current);
      if (finishTimer.current) clearTimeout(finishTimer.current);
    };
  }, []);

  const skipIntro = () => {
    if (timer.current) clearInterval(timer.current);
    if (finishTimer.current) clearTimeout(finishTimer.current);
    window.sessionStorage.setItem("morrow-intro-seen", "true");
    setActiveStep(buildSections.length - 1);
    setProgress(100);
    setBuilding(false);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="storefront" data-building={building ? "true" : "false"}>
      <div className="announcement-bar" data-assembly={activeStep >= 0 ? "ready" : "waiting"}>
        <span>A little color goes a long way</span>
        <span className="announcement-divider" aria-hidden="true">✳</span>
        <span>Thoughtful things for home</span>
      </div>

      <header
        id="site-nav"
        className="store-header"
        data-assembly={activeStep >= 0 ? "ready" : "waiting"}
      >
        <div className="store-header-inner">
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open menu">
            <Menu aria-hidden="true" />
          </Button>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#shop-categories">Shop</a>
            <a href="#featured">New & notable</a>
            <a href="#editorial">Our point of view</a>
          </nav>
          <a href="#top" className="wordmark" aria-label="Morrow Living home">
            <span className="wordmark-star" aria-hidden="true">✳</span>
            <span>MORROW</span>
            <small>LIVING</small>
          </a>
          <div className="header-actions">
            <Button variant="ghost" size="icon" className="header-search" aria-label="Search products" onClick={() => document.getElementById("product-search")?.focus()}>
              <Search aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" className="header-wishlist" aria-label="Wishlist">
              <Heart aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" className="cart-trigger" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}>
              <ShoppingBag aria-hidden="true" />
              <span className="cart-count">0</span>
            </Button>
          </div>
        </div>
      </header>

      <section id="shop-hero" className="shop-hero" data-assembly={activeStep >= 1 ? "ready" : "waiting"}>
        <img src={heroImage} alt="A sunlit living room with a sculptural red side table" width={1920} height={1104} fetchPriority="high" />
        <div className="hero-copy" id="top">
          <p className="eyebrow"><span className="eyebrow-mark">✳</span> Make yourself at home</p>
          <h1>Good things for<br />the corners you love.</h1>
          <p className="hero-description">A little more color. A little more character. A home that feels like you.</p>
          <Button asChild className="hero-button">
            <a href="#shop-categories">Find your something <ArrowRight aria-hidden="true" /></a>
          </Button>
        </div>
        <span className="hero-caption">THE EVERYDAY, A LITTLE MORE LOVELY <span>— EST. MMXXIV</span></span>
        <a className="hero-down" href="#shop-categories" aria-label="Scroll to categories"><ArrowDownRight aria-hidden="true" /></a>
      </section>

      <section id="shop-categories" className="category-section" data-assembly={activeStep >= 2 ? "ready" : "waiting"}>
        <div className="section-heading category-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark">01</span> Find your feeling</p>
            <h2>Good company<br className="mobile-break" /> for every room.</h2>
          </div>
          <p className="section-aside">Objects to keep. Textures to touch.<br />Light that changes everything.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className={`category-tile category-tile-${index + 1}`} href="#featured" key={category.name}>
              <div className="category-image-wrap">
                <img src={category.image} alt={`${category.name} collection`} width={1024} height={1200} loading="lazy" />
                <span className="category-arrow"><ArrowDownRight aria-hidden="true" /></span>
              </div>
              <div className="category-caption">
                <div><h3>{category.name}</h3><p>{category.note}</p></div>
                <span className="category-number">0{index + 1}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="featured" className="featured-section" data-assembly={activeStep >= 3 ? "ready" : "waiting"}>
        <div className="featured-topline">
          <p className="eyebrow"><span className="eyebrow-mark">02</span> The considered edit</p>
          <span className="featured-note">Thoughtfully found, never in a hurry.</span>
        </div>
        <div className="featured-title-row">
          <h2>Things worth<br />bringing home.</h2>
          <div className="featured-controls">
            <label className="search-field" htmlFor="product-search">
              <Search aria-hidden="true" />
              <input
                id="product-search"
                aria-label="Search products"
                placeholder="Find a favorite"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setSearch("")}><X aria-hidden="true" /></Button>}
            </label>
          </div>
        </div>
        <div className="collection-tabs" role="group" aria-label="Filter products by category">
          {["Everything", "Objects", "Textiles", "Lighting"].map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={selectedCategory === category ? "collection-tab is-selected" : "collection-tab"}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="empty-products" aria-live="polite">
          <span className="empty-sparkle" aria-hidden="true">✳</span>
          <h3>No products found</h3>
          <p>There’s a little room on these shelves. Tell me in the chat what you’d like to sell, and its price, and I can add it to your Shopify store.</p>
          {(search || selectedCategory !== "Everything") && (
            <Button variant="outline" onClick={() => { setSearch(""); setSelectedCategory("Everything"); }}>Clear filters <X aria-hidden="true" /></Button>
          )}
        </div>
      </section>

      <section id="editorial" className="editorial-section" data-assembly={activeStep >= 4 ? "ready" : "waiting"}>
        <div className="editorial-image">
          <img src={objectsImage} alt="Colorful objects and natural textures for a considered home" width={1024} height={1200} loading="lazy" />
          <span className="editorial-image-label">A PLACE FOR THE THINGS YOU LOVE</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow"><span className="eyebrow-mark">03</span> Less matchy. More you.</p>
          <h2>Make room<br />for your kind<br />of home.</h2>
          <p>Not a showroom. Not a rulebook. Just lovely, useful things that make your place feel a little more like yours.</p>
          <a href="#shop-categories" className="text-link">A little about our point of view <ArrowRight aria-hidden="true" /></a>
          <span className="editorial-doodle" aria-hidden="true">✳</span>
        </div>
      </section>

      <footer id="site-footer" className="store-footer" data-assembly={activeStep >= 5 ? "ready" : "waiting"}>
        <div className="footer-top">
          <div className="footer-signoff">
            <span className="footer-star" aria-hidden="true">✳</span>
            <p>Here’s to making<br />the everyday lovely.</p>
          </div>
          <div className="footer-links">
            <div><span className="footer-label">WANDER AROUND</span><a href="#shop-categories">Shop all</a><a href="#featured">New & notable</a><a href="#editorial">Our story</a></div>
            <div><span className="footer-label">HERE TO HELP</span><a href="#site-footer">Shipping & returns</a><a href="#site-footer">Get in touch</a><a href="#site-footer">FAQs</a></div>
          </div>
          <div className="footer-newsletter">
            <span className="footer-label">A NICE NOTE NOW AND THEN</span>
            <p>Fresh finds, good ideas, and the odd little surprise.</p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Your email address" />
              <Button type="submit" variant="ghost" size="icon" aria-label="Join the mailing list"><ArrowRight aria-hidden="true" /></Button>
            </form>
            <span className="newsletter-fineprint">The occasional lovely thing. Unsubscribe any time.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#top" className="footer-wordmark">MORROW <span>✳</span> LIVING</a>
          <span>Made for the lived-in life.</span>
          <span>© 2026 Morrow Living</span>
        </div>
      </footer>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="cart-sheet">
          <SheetHeader className="cart-sheet-heading">
            <span className="eyebrow"><span className="eyebrow-mark">✳</span> YOUR LITTLE BAG</span>
            <SheetTitle>Your bag is taking a breather.</SheetTitle>
            <SheetDescription>There’s nothing in here just yet. A good find will feel right at home.</SheetDescription>
          </SheetHeader>
          <div className="cart-empty-icon"><ShoppingBag aria-hidden="true" /></div>
          <Button asChild className="cart-shop-button" onClick={() => setCartOpen(false)}>
            <a href="#shop-categories">Have a little look <ArrowRight aria-hidden="true" /></a>
          </Button>
        </SheetContent>
      </Sheet>

      {building && (
        <>
          <div className="build-progress" role="status" aria-live="polite">
            <div className="build-progress-copy">
              <span className="build-live-dot" />
              <span>{finished ? "Your Shopping Experience Is Ready" : "Building your shopping experience…"}</span>
              <strong>{progress}%</strong>
            </div>
            <div className="build-progress-track"><span style={{ width: `${progress}%` }} /></div>
          </div>
          <Button variant="outline" className="skip-build" onClick={skipIntro}>Skip animation <X aria-hidden="true" /></Button>
          {!finished && builders.map((builder, index) => (
            <div className={`build-cursor build-cursor-${index + 1}`} key={builder} aria-hidden="true">
              <MousePointer2 className="build-pointer" />
              <span>{builder}</span>
            </div>
          ))}
          {finished && <div className="build-complete"><span><Check aria-hidden="true" /></span><p>Your Shopping Experience<br />Is Ready</p><Sparkles aria-hidden="true" className="build-complete-sparkle" /></div>}
        </>
      )}
    </main>
  );
}