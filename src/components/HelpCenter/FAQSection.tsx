import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What services does Fuke\'s Media offer?',
        answer: 'We offer comprehensive VFX services including compositing, 3D modeling, animation, motion graphics, color grading, and AI-driven visual effects. We also provide creative services for commercials, music videos, and digital content.'
      },
      {
        question: 'How do I get a quote for my project?',
        answer: 'You can get an instant estimate using our Advanced Pricing Calculator at /advanced-pricing, or request a custom quote by contacting us directly through our Contact page. We typically respond within 24 hours with a detailed proposal.'
      },
      {
        question: 'What is your turnaround time?',
        answer: 'Turnaround time varies based on project scope and complexity. Simple tasks can be completed within 24-48 hours, while complex feature film VFX may take weeks. We provide accurate timelines during the quoting process and maintain transparent communication throughout production.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What file formats do you accept?',
        answer: 'We accept all industry-standard formats including EXR, DPX, TIFF, ProRes, DNxHD, and more. For 3D assets, we work with FBX, OBJ, Alembic, and USD. Our team can advise on the best formats for your specific project.'
      },
      {
        question: 'Do you provide revisions?',
        answer: 'Yes! We include 2 rounds of revisions in our standard pricing. Additional revisions can be accommodated at a pre-agreed rate. We work closely with clients to ensure satisfaction at each stage of production.'
      },
      {
        question: 'What software do you use?',
        answer: 'We use industry-standard tools including Nuke, Maya, Houdini, After Effects, DaVinci Resolve, and proprietary AI-powered tools. Our team is proficient across multiple platforms to match your pipeline requirements.'
      }
    ]
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'How is pricing calculated?',
        answer: 'Pricing is based on project complexity, shot count, frame count, and required resources. We offer transparent frame-based pricing for VFX work and package pricing for creative services. Use our pricing calculator for instant estimates.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, international wire transfers, and payment platforms like PayPal and Wise. For larger projects, we can arrange milestone-based payment schedules.'
      },
      {
        question: 'Do you offer discounts for bulk projects?',
        answer: 'Yes! We provide volume discounts for projects with 100+ shots or long-term partnerships. Contact our sales team to discuss custom pricing packages tailored to your needs.'
      }
    ]
  },
  {
    category: 'Collaboration',
    questions: [
      {
        question: 'How do you handle file transfers?',
        answer: 'We use secure cloud-based file transfer services including Aspera, Frame.io, and Google Drive for Business. For large projects, we can set up dedicated FTP servers. All transfers are encrypted and secure.'
      },
      {
        question: 'Can you work with our existing pipeline?',
        answer: 'Absolutely! Our technical team is experienced in integrating with various production pipelines. We can adapt to your workflow, color space, and naming conventions to ensure seamless collaboration.'
      },
      {
        question: 'Do you sign NDAs?',
        answer: 'Yes, we understand the importance of confidentiality. We readily sign NDAs and have strict internal protocols to protect client intellectual property. Security and discretion are paramount in all our projects.'
      }
    ]
  }
];

const FAQSection = () => {
  return (
    <div className="space-y-8">
      {faqs.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-2xl font-display font-bold mb-4 text-primary">
            {category.category}
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {category.questions.map((faq, faqIndex) => (
              <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
