export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          city: string | null
          country: string | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          founded_year: number | null
          id: string
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_hiring: boolean | null
          is_verified: boolean | null
          location: string | null
          logo_url: string | null
          name: string
          owner_id: string | null
          size: string | null
          slug: string
          social_links: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_hiring?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          size?: string | null
          slug: string
          social_links?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_hiring?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          size?: string | null
          slug?: string
          social_links?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string | null
          message: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type?: string | null
          message: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          client_email: string
          client_name: string
          contract_file_url: string | null
          contract_terms: string | null
          created_at: string
          currency: string | null
          deliverables: string[] | null
          end_date: string | null
          id: string
          ip_rights: string | null
          milestones: Json | null
          payment_terms: string | null
          project_description: string | null
          project_name: string
          project_type: string
          revision_rounds: number | null
          signed_at: string | null
          special_clauses: string[] | null
          start_date: string | null
          status: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          client_email: string
          client_name: string
          contract_file_url?: string | null
          contract_terms?: string | null
          created_at?: string
          currency?: string | null
          deliverables?: string[] | null
          end_date?: string | null
          id?: string
          ip_rights?: string | null
          milestones?: Json | null
          payment_terms?: string | null
          project_description?: string | null
          project_name: string
          project_type: string
          revision_rounds?: number | null
          signed_at?: string | null
          special_clauses?: string[] | null
          start_date?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          client_email?: string
          client_name?: string
          contract_file_url?: string | null
          contract_terms?: string | null
          created_at?: string
          currency?: string | null
          deliverables?: string[] | null
          end_date?: string | null
          id?: string
          ip_rights?: string | null
          milestones?: Json | null
          payment_terms?: string | null
          project_description?: string | null
          project_name?: string
          project_type?: string
          revision_rounds?: number | null
          signed_at?: string | null
          special_clauses?: string[] | null
          start_date?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          notes: string | null
          portfolio_url: string | null
          resume_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          notes?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_email: string | null
          application_url: string | null
          applications_count: number | null
          company_id: string | null
          created_at: string | null
          description: string
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at: string | null
          id: string
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_active: boolean | null
          is_featured: boolean | null
          is_remote: boolean | null
          job_type: Database["public"]["Enums"]["job_type"] | null
          location: string | null
          posted_by: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          skills: string[] | null
          slug: string
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          application_email?: string | null
          application_url?: string | null
          applications_count?: number | null
          company_id?: string | null
          created_at?: string | null
          description: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"] | null
          location?: string | null
          posted_by?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          application_email?: string | null
          application_url?: string | null
          applications_count?: number | null
          company_id?: string | null
          created_at?: string | null
          description?: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"] | null
          location?: string | null
          posted_by?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          read_at: string | null
          receiver_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          receiver_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          source: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          read_at: string | null
          reference_id: string | null
          reference_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          client: string | null
          created_at: string | null
          description: string | null
          id: string
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_featured: boolean | null
          likes_count: number | null
          project_url: string | null
          role: string | null
          thumbnail_url: string | null
          title: string
          tools_used: string[] | null
          updated_at: string | null
          user_id: string
          video_url: string | null
          views_count: number | null
          year: number | null
        }
        Insert: {
          client?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_featured?: boolean | null
          likes_count?: number | null
          project_url?: string | null
          role?: string | null
          thumbnail_url?: string | null
          title: string
          tools_used?: string[] | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
          views_count?: number | null
          year?: number | null
        }
        Update: {
          client?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_featured?: boolean | null
          likes_count?: number | null
          project_url?: string | null
          role?: string | null
          thumbnail_url?: string | null
          title?: string
          tools_used?: string[] | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
          views_count?: number | null
          year?: number | null
        }
        Relationships: []
      }
      pricing_quotes: {
        Row: {
          client_email: string | null
          client_name: string | null
          complexity_level: string | null
          created_at: string
          currency: string | null
          estimated_cost: number
          frame_count: number | null
          id: string
          pricing_tier: string
          project_duration: number | null
          project_name: string
          project_type: string
          service_type: string
          specifications: Json | null
          status: string | null
          updated_at: string
          user_id: string | null
          valid_until: string | null
        }
        Insert: {
          client_email?: string | null
          client_name?: string | null
          complexity_level?: string | null
          created_at?: string
          currency?: string | null
          estimated_cost: number
          frame_count?: number | null
          id?: string
          pricing_tier: string
          project_duration?: number | null
          project_name: string
          project_type: string
          service_type: string
          specifications?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Update: {
          client_email?: string | null
          client_name?: string | null
          complexity_level?: string | null
          created_at?: string
          currency?: string | null
          estimated_cost?: number
          frame_count?: number | null
          id?: string
          pricing_tier?: string
          project_duration?: number | null
          project_name?: string
          project_type?: string
          service_type?: string
          specifications?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availability: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          cover_url: string | null
          created_at: string
          display_name: string | null
          hourly_rate: number | null
          id: string
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire: boolean | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          portfolio_url: string | null
          skills: string[] | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title: string | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          cover_url?: string | null
          created_at?: string
          display_name?: string | null
          hourly_rate?: number | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title?: string | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          cover_url?: string | null
          created_at?: string
          display_name?: string | null
          hourly_rate?: number | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title?: string | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      project_briefs: {
        Row: {
          attachments: string[] | null
          budget_currency: string | null
          budget_max: number | null
          budget_min: number | null
          budget_type: string | null
          category: string | null
          client_id: string
          created_at: string | null
          deadline: string | null
          description: string
          duration_estimate: string | null
          id: string
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_featured: boolean | null
          is_remote: boolean | null
          location: string | null
          proposals_count: number | null
          required_skills: string[] | null
          status: string | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          attachments?: string[] | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          budget_type?: string | null
          category?: string | null
          client_id: string
          created_at?: string | null
          deadline?: string | null
          description: string
          duration_estimate?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          location?: string | null
          proposals_count?: number | null
          required_skills?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          attachments?: string[] | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          budget_type?: string | null
          category?: string | null
          client_id?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          duration_estimate?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          location?: string | null
          proposals_count?: number | null
          required_skills?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      project_proposals: {
        Row: {
          artist_id: string
          brief_id: string
          cover_letter: string
          created_at: string | null
          id: string
          portfolio_samples: string[] | null
          proposed_budget: number | null
          proposed_timeline: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          artist_id: string
          brief_id: string
          cover_letter: string
          created_at?: string | null
          id?: string
          portfolio_samples?: string[] | null
          proposed_budget?: number | null
          proposed_timeline?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          artist_id?: string
          brief_id?: string
          cover_letter?: string
          created_at?: string | null
          id?: string
          portfolio_samples?: string[] | null
          proposed_budget?: number | null
          proposed_timeline?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_proposals_brief_id_fkey"
            columns: ["brief_id"]
            isOneToOne: false
            referencedRelation: "project_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget_range: string | null
          case_study_url: string | null
          category: string | null
          challenges: string[] | null
          client: string | null
          created_at: string
          description: string | null
          duration_months: number | null
          featured: boolean | null
          id: string
          image_url: string | null
          imdb_url: string | null
          order_index: number | null
          results: string[] | null
          services: string[] | null
          solutions: string[] | null
          status: string | null
          team_size: number | null
          technologies: string[] | null
          testimonial: string | null
          testimonial_author: string | null
          title: string
          updated_at: string
          video_url: string | null
          year: number | null
        }
        Insert: {
          budget_range?: string | null
          case_study_url?: string | null
          category?: string | null
          challenges?: string[] | null
          client?: string | null
          created_at?: string
          description?: string | null
          duration_months?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          imdb_url?: string | null
          order_index?: number | null
          results?: string[] | null
          services?: string[] | null
          solutions?: string[] | null
          status?: string | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Update: {
          budget_range?: string | null
          case_study_url?: string | null
          category?: string | null
          challenges?: string[] | null
          client?: string | null
          created_at?: string
          description?: string | null
          duration_months?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          imdb_url?: string | null
          order_index?: number | null
          results?: string[] | null
          services?: string[] | null
          solutions?: string[] | null
          status?: string | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string | null
          description: string | null
          download_url: string | null
          features: string[] | null
          id: string
          image_url: string | null
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_approved: boolean | null
          is_featured: boolean | null
          name: string
          price: number | null
          price_currency: string | null
          pricing_type: string | null
          rating: number | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          reviews_count: number | null
          short_description: string | null
          slug: string
          submitted_by: string | null
          tags: string[] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          name: string
          price?: number | null
          price_currency?: string | null
          pricing_type?: string | null
          rating?: number | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          reviews_count?: number | null
          short_description?: string | null
          slug: string
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number | null
          price_currency?: string | null
          pricing_type?: string | null
          rating?: number | null
          resource_type?: Database["public"]["Enums"]["resource_type"]
          reviews_count?: number | null
          short_description?: string | null
          slug?: string
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_verified: boolean | null
          project_brief_id: string | null
          rating: number
          reviewed_user_id: string
          reviewer_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          project_brief_id?: string | null
          rating: number
          reviewed_user_id: string
          reviewer_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          project_brief_id?: string | null
          rating?: number
          reviewed_user_id?: string
          reviewer_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_project_brief_id_fkey"
            columns: ["project_brief_id"]
            isOneToOne: false
            referencedRelation: "project_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_items: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tool_usage: {
        Row: {
          created_at: string
          error_message: string | null
          file_size: number | null
          id: string
          input_format: string | null
          output_format: string | null
          processing_time: number | null
          success: boolean | null
          tool_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          file_size?: number | null
          id?: string
          input_format?: string | null
          output_format?: string | null
          processing_time?: number | null
          success?: boolean | null
          tool_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          file_size?: number | null
          id?: string
          input_format?: string | null
          output_format?: string | null
          processing_time?: number | null
          success?: boolean | null
          tool_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      profiles_public: {
        Row: {
          availability: string | null
          avatar_url: string | null
          bio: string | null
          cover_url: string | null
          created_at: string | null
          display_name: string | null
          hourly_rate: number | null
          id: string | null
          industries: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire: boolean | null
          linkedin_url: string | null
          location: string | null
          portfolio_url: string | null
          skills: string[] | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title: string | null
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          hourly_rate?: number | null
          id?: string | null
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          hourly_rate?: number | null
          id?: string | null
          industries?: Database["public"]["Enums"]["industry_category"][] | null
          is_available_for_hire?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          title?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      subscriptions_public: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      experience_level:
        | "entry"
        | "junior"
        | "mid"
        | "senior"
        | "lead"
        | "executive"
      industry_category:
        | "vfx"
        | "animation"
        | "film"
        | "tv"
        | "gaming"
        | "advertising"
        | "virtual-production"
        | "ar-vr"
        | "youtube"
        | "ai-ml"
      job_type:
        | "full-time"
        | "part-time"
        | "contract"
        | "freelance"
        | "internship"
        | "remote"
      resource_type:
        | "software"
        | "plugin"
        | "asset"
        | "tutorial"
        | "template"
        | "stock-footage"
        | "stock-image"
        | "stock-audio"
        | "3d-model"
      subscription_tier: "free" | "artist" | "studio" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      experience_level: [
        "entry",
        "junior",
        "mid",
        "senior",
        "lead",
        "executive",
      ],
      industry_category: [
        "vfx",
        "animation",
        "film",
        "tv",
        "gaming",
        "advertising",
        "virtual-production",
        "ar-vr",
        "youtube",
        "ai-ml",
      ],
      job_type: [
        "full-time",
        "part-time",
        "contract",
        "freelance",
        "internship",
        "remote",
      ],
      resource_type: [
        "software",
        "plugin",
        "asset",
        "tutorial",
        "template",
        "stock-footage",
        "stock-image",
        "stock-audio",
        "3d-model",
      ],
      subscription_tier: ["free", "artist", "studio", "enterprise"],
    },
  },
} as const
