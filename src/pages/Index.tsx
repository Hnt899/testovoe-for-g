import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Advantages } from "@/components/Advantages";
import { NewsFeed } from "@/components/NewsFeed";
import { InterviewForm } from "@/components/InterviewForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Advantages />
      <NewsFeed />
      <InterviewForm />
    </div>
  );
};

export default Index;
