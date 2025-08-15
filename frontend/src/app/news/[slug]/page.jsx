import NewsCard from "@/../../components/NewsCard";

const newsData = [
  {
    slug: "oil-prices-drop",
    title: "Oil Prices Drop Sharply as Global Demand Slows and Supply Rises",
    date: "30th June 2025",
    image: "/images/oil-drop.jpg",
    summary:
      "Global oil prices have entered a volatile phase, impacted by weakening demand and increasing supply...",
    content: `
Global oil prices have entered a volatile phase, impacted by weakening demand and increasing supply. Following a brief rise above $80 per barrel in mid-June largely attributed to geopolitical concerns Brent crude has since declined significantly, falling to $67.76. The September contract now trades near $66.97, while U.S. West Texas Intermediate (WTI) has dropped to $65.61, marking the steepest weekly decline since the pandemic-era lows of 2020.

This downturn reflects shifting market fundamentals as supply outpaces demand. The OPEC+ alliance, led by Saudi Arabia and Russia, is expected to implement another production increase in August. A proposed 411,000-barrel-per-day rise will be discussed during the upcoming July 6 meeting, forming part of a broader strategy to gradually reverse nearly 1 million barrels per day of voluntary cuts introduced earlier this year.

Adding to supply pressures, several producers including Kazakhstan have exceeded their assigned output quotas. Kazakhstan’s Tengiz field, bolstered by recent infrastructure expansions, has reached record production levels, contributing to concerns about swelling global inventories.

Analysts suggest that without a significant shift in policy or a major supply disruption, oil prices may remain under pressure throughout the second half of 2025. Rising stockpiles and slowing economic activity in key markets are making it increasingly difficult for prices to stabilize above the $70 threshold.

At a time when energy markets remain highly sensitive to both macroeconomic trends and geopolitical developments, stakeholders across the industry are closely monitoring the balance between supply and demand. The outlook for the remainder of the year will likely depend on coordinated production strategies, inventory management, and broader economic signals from global markets.
    `,
  },
  {
    slug: "india-offshore-exploration",
    title:
      "India Launches Massive Offshore Energy Exploration Covering Over 2.5 Lakh km²",
    date: "09th July 2025",
    image: "/images/india-offshore.png",
    summary:
      "India has kicked off one of the world’s largest offshore oil and gas exploration efforts through OALP Round X...",
    content: `
India has kicked off one of the world’s largest offshore oil and gas exploration efforts through the Open Acreage Licensing Programme (OALP) Round X, offering more than 2.5 lakh square kilometers of offshore, deepwater, and onshore blocks for bidding. This bold move aims to boost domestic energy production, reduce import dependence, and attract global investment.

Significant reforms have removed nearly all previous restrictions, opening up 99% of offshore zones to exploration. India is also partnering with international experts, notably from Norway, to develop a robust deepwater exploration and production ecosystem covering drilling technology, subsea systems, and digital monitoring.

The government is inviting stakeholder feedback on draft contracts until July 17, 2025, with bidding results expected later this year. This initiative marks a major step toward strengthening India’s energy security and fostering innovation in offshore oil and gas development.
    `,
  },
];

// Static params for export
export async function generateStaticParams() {
  return newsData.map((item) => ({
    slug: item.slug,
  }));
}

export default function NewsDetailPage({ params }) {
  const { slug } = params;
  const currentNews = newsData.find((item) => item.slug === slug);
  const otherNews = newsData.filter((item) => item.slug !== slug);

  if (!currentNews) {
    return <div className="p-10 text-gray-500">Article not found.</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main News Content */}
        <article className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
          {/* Small Image */}
          <img
            src={currentNews.image}
            alt={currentNews.title}
            className="w-full  object-cover rounded-md mb-4"
          />

          <h1 className="text-2xl font-bold mb-4">{currentNews.title}</h1>
          <p className="text-xs text-gray-500 mb-6">{currentNews.date}</p>
          <div className="prose text-gray-700 whitespace-pre-line">
            {currentNews.content}
          </div>
        </article>

        {/* Other News Sidebar */}
        {otherNews.length > 0 && (
          <aside className="bg- p-4 rounded-lg ">
            <h2 className="text-lg font-bold mb-4">Other News</h2>
            <div className="flex flex-col gap-4">
              {otherNews.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
