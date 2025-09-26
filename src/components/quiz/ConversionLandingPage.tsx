import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";
import { 
  Calendar, 
  Check, 
  ArrowRight, 
  Play, 
  Brain, 
  Heart, 
  Star, 
  Shield,
  X,
  TrendingUp,
  Target,
  Award,
  Users,
  CheckCircle
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { ConfettiBurst } from "./ConfettiBurst";
import { buildJourney, JourneyAnswer, JourneyUserContext } from "@/lib/buildJourney";

interface ConversionLandingPageProps {
  config: QuizConfig;
  participant: QuizParticipant;
  personalizedResult: ResultTemplate | null;
  gradedAnswers?: JourneyAnswer[];
  userContext?: JourneyUserContext;
}

const ConversionLandingPage = ({
  config,
  participant,
  personalizedResult,
  gradedAnswers,
  userContext
}: ConversionLandingPageProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build dynamic journey payload for the "Based on your answers..." section
  const journey = buildJourney({
    personalizedResult: personalizedResult ?? { id: "a1", title: "A1 • Beginner", description: "" },
    answers: (gradedAnswers ?? []).filter(a => a.q > 0),
    user: userContext,
    proof: {
      classesTaughtText: "Live classes taught every day",
      ratingText: "Top-rated by learners"
    }
  });

  // Derived stat ring values for readiness (Card 4)
  const readinessStr = journey.cards.proofTutor.stat?.value ?? "0%";
  const readinessNum = parseInt(readinessStr.replace("%", ""), 10) || 0;
  const ringCircumference = 251.2;
  const ringDashOffset = ringCircumference * (1 - Math.max(0, Math.min(100, readinessNum)) / 100);

  // Play celebration SFX alongside confetti. Handles autoplay restrictions by
  // retrying playback on the next user gesture if necessary.
  useEffect(() => {
    const audioSrc = "/music/Success%20Joy.wav";
    const audio = new Audio(audioSrc);
    audio.volume = 0.6;
    let interactionHandler: ((e?: any) => void) | null = null;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        // Autoplay blocked — attach one-time gesture listeners to retry
        interactionHandler = () => {
          audio.play().catch(() => {});
          if (interactionHandler) {
            window.removeEventListener("pointerdown", interactionHandler as EventListener);
            window.removeEventListener("keydown", interactionHandler as EventListener);
            interactionHandler = null;
          }
        };
        window.addEventListener("pointerdown", interactionHandler);
        window.addEventListener("keydown", interactionHandler);
      }
    };

    // Attempt immediate playback when confetti is shown
    if (showConfetti) {
      tryPlay();
    }

    return () => {
      // Cleanup audio and any event listeners
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
      } catch (e) {
        // ignore
      }
      if (interactionHandler) {
        window.removeEventListener("pointerdown", interactionHandler as EventListener);
        window.removeEventListener("keydown", interactionHandler as EventListener);
        interactionHandler = null;
      }
    };
  }, [showConfetti]);
  
  // Load HubSpot meetings script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  // Redirect to results page and store data
  useEffect(() => {
    localStorage.setItem('quizConfig', JSON.stringify(config));
    localStorage.setItem('quizParticipant', JSON.stringify(participant));
    localStorage.setItem('personalizedResult', JSON.stringify(personalizedResult));
    localStorage.setItem('gradedAnswers', JSON.stringify(gradedAnswers));
    localStorage.setItem('userContext', JSON.stringify(userContext));
    window.location.href = '/results/index.html';
  }, []);

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const openTestimonialModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeTestimonialModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Testimonial data
  const testimonials = [
    {
      name: "Koji",
      quote: "I can finally talk to my grandchildren in Spanish!",
      video: "/videos/koji-testimonial.mp4",
      image: "/images/testimonials-preview/koji-testimonial.png"
    },
    {
      name: "Suzanne", 
      quote: "My confidence has skyrocketed! I love it!",
      video: "/videos/suzanne-testimonial.mp4",
      image: "/images/testimonials-preview/suzanne-testimonial.png"
    },
    {
      name: "Catie",
      quote: "Learning Spanish opened new doors!",
      video: "/videos/catie-testimonial.mp4",
      image: "/images/testimonials-preview/catie-testimonial.png"
    },
    {
      name: "Boris",
      quote: "Classes were structured to meet my needs...",
      video: "/videos/boris-testimonial.mp4",
      image: "/images/testimonials-preview/boris-testimonial.png"
    },
    {
      name: "Chris", 
      quote: "Each class is tailored to my individual needs and abilities.",
      video: "/videos/chris-testimonial.mp4",
      image: "/images/testimonials-preview/chris-testimonial.png"
    },
    {
      name: "Kholman",
      quote: "Spanish VIP is the best program I've worked with.",
      video: "/videos/kholman-testimonial.mp4",
      image: "/images/testimonials-preview/kholman-testimonial.png"
    }
  ];

  const textTestimonials = [
    {
      name: "Anna Garcia",
      quote: "The personalized learning path was exactly what I needed. I'm now fluent and confident!",
      rating: 5
    },
    {
      name: "Robert Kim",
      quote: "SpanishVIP's methodology is revolutionary. I learned more in 3 months than 2 years of self-study.",
      rating: 5
    },
    {
      name: "Maria Santos",
      quote: "The teachers are native speakers who really care about your progress. Highly recommended!",
      rating: 5
    },
    {
      name: "John Davis",
      quote: "Perfect for busy professionals. Flexible scheduling and amazing results.",
      rating: 5
    }
  ];

  return null;
};

export default ConversionLandingPage;