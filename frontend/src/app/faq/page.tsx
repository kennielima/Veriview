"use client"
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "@/lib/FAQ";
import { useSearchParams } from "next/navigation";

export default function faq() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const param = useSearchParams();
    const index = param.get('index')
    let faqRef = useRef<any>([]);

    useEffect(() => {
        if (index) {
            faqRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
            setExpandedIndex(Number(index))
        }
    }, [index]);

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>

            <div className="border border-gray-200 rounded-lg">
                {FAQS.map((faq, index) => (
                    <div
                        key={index}
                        ref={(i) => { faqRef.current[index] = i }}
                        className="overflow-hidden transition-all duration-200"
                    >
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center w-full p-6 text-left bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {expandedIndex === index ?
                                <ChevronUp className="text-gray-500 flex-shrink-0" size={20} /> :
                                <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                            }
                        </div>

                        {expandedIndex === index && (
                            <div className="p-6 bg-white text-black border-b border-gray-200">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Still have questions?</h3>
                <p className="text-indigo-700 mb-4">Our support team is here to help with any other questions you might have.</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                    Contact Support
                </button>
            </div> */}
        </div>
    );
}