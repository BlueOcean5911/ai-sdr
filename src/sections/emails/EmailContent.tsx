import { Parser as HtmlToReactParser } from "html-to-react";
import DOMPurify from "dompurify";

export const EmailContent = ({ content }: { content: string }) => {
  const decodedContent = content
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'");
  const htmlToReactParser = HtmlToReactParser();
  const sanitizedContent = DOMPurify.sanitize(decodedContent);
  const reactElement = htmlToReactParser.parse(sanitizedContent);

  return <div className="prose prose-sm max-w-none">{reactElement}</div>;
};
