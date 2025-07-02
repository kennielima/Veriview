import React from "react";

const reviewTerms = {
    respectfulCommunication: {
        title: "Respectful Communication",
        points: [
            "Treat all individuals—users, brands, and businesses—with respect.",
            "Constructive criticism is welcome, but harassment, bullying, or intimidation will not be tolerated.",
            "Disagreements are natural; personal attacks are not.",
        ],
    },

    prohibitedBehaviors: {
        title: "Prohibited Behaviors",
        list: [
            {
                heading: "Bullying or Intimidation by Brands or Users",
                description:
                    "Any form of coercion, threats, or attempts to silence users through intimidation—especially from brands or business accounts—is strictly forbidden.",
            },
            {
                heading: "Doxxing",
                description:
                    "Sharing personal, private, or identifying information of any individual or business representative without explicit consent is not allowed.",
            },
            {
                heading: "Personal Vendettas",
                description:
                    "Reviews that appear to be part of a targeted campaign or personal grudge, rather than genuine consumer experience, may be removed.",
            },
            {
                heading: "Spamming or Fake Engagement",
                description:
                    "Repeated posting, irrelevant links, fake reviews, or incentivized content without disclosure is prohibited.",
            },
        ],
    },

    authenticityIntegrity: {
        title: "Authenticity & Integrity",
        points: [
            "Reviews should be honest reflections of personal experiences.",
            "Multiple accounts to manipulate reviews (positively or negatively) are not allowed.",
            "If you represent a brand, please disclose your affiliation clearly when posting.",
        ],
    },

    moderationEnforcement: {
        title: "Moderation & Enforcement",
        points: [
            "We reserve the right to remove any content that violates these guidelines.",
            "Repeat or severe violations may result in account suspension or ban.",
            "If you believe content violates our policies, report it through our in-app tools.",
        ],
    },

    helpFeedback: {
        title: "Need Help or Have Feedback?",
        description:
            "We welcome feedback to improve your experience. Contact support for concerns.",
    },
};

export default function page() {
    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto m-12 px-10">
            <h1 className="flex justify-center font-bold text-xl">Veriview Policies</h1>

            {/* Prohibited Behaviors */}
            <section>
                <h2 className="font-bold mb-2 text-lg">{reviewTerms.prohibitedBehaviors.title} ❌</h2>
                {reviewTerms.prohibitedBehaviors.list.map(({ heading, description }, i) => (
                    <div key={i} className="mb-3">
                        <h3 className="font-semibold">{heading}</h3>
                        <p>{description}</p>
                    </div>
                ))}
            </section>

            {/* Respectful Communication */}
            <section>
                <h2 className="font-bold mb-2 text-lg">{reviewTerms.respectfulCommunication.title}</h2>
                <ul>
                    {reviewTerms.respectfulCommunication.points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </section>

            {/* Authenticity & Integrity */}
            <section>
                <h2 className="font-bold mb-2 text-lg">{reviewTerms.authenticityIntegrity.title}</h2>
                <ul>
                    {reviewTerms.authenticityIntegrity.points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </section>

            {/* Moderation & Enforcement */}
            <section>
                <h2 className="font-bold mb-2 text-lg">{reviewTerms.moderationEnforcement.title}</h2>
                <ul>
                    {reviewTerms.moderationEnforcement.points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </section>

            {/* Help & Feedback */}
            <section>
                <h2 className="font-bold mb-2 text-lg">{reviewTerms.helpFeedback.title}</h2>
                <p>{reviewTerms.helpFeedback.description}</p>
            </section>
        </div>
    );
}
