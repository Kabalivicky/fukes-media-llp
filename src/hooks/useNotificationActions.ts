import { supabase } from '@/integrations/supabase/client';

type NotificationType = 
  | 'follow'
  | 'message'
  | 'workspace_message'
  | 'proposal'
  | 'proposal_update'
  | 'job_application'
  | 'milestone'
  | 'payment'
  | 'project_invite';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  content?: string;
  referenceId?: string;
  referenceType?: string;
}

export const createNotification = async ({
  userId,
  type,
  title,
  content,
  referenceId,
  referenceType,
}: CreateNotificationParams): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        content,
        reference_id: referenceId,
        reference_type: referenceType,
      });

    if (error) {
      console.error('Error creating notification:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

// Notification helper functions for common events
export const notifyNewFollower = async (followedUserId: string, followerName: string) => {
  return createNotification({
    userId: followedUserId,
    type: 'follow',
    title: 'New Follower',
    content: `${followerName} started following you`,
    referenceType: 'profile',
  });
};

export const notifyNewMessage = async (receiverId: string, senderName: string, preview: string) => {
  return createNotification({
    userId: receiverId,
    type: 'message',
    title: 'New Message',
    content: `${senderName}: ${preview.slice(0, 100)}${preview.length > 100 ? '...' : ''}`,
    referenceType: 'message',
  });
};

export const notifyWorkspaceMessage = async (
  recipientId: string, 
  senderName: string, 
  workspaceId: string,
  projectTitle: string
) => {
  return createNotification({
    userId: recipientId,
    type: 'workspace_message',
    title: 'New Project Message',
    content: `${senderName} sent a message in "${projectTitle}"`,
    referenceId: workspaceId,
    referenceType: 'workspace',
  });
};

export const notifyNewProposal = async (
  clientId: string, 
  artistName: string, 
  briefId: string,
  briefTitle: string
) => {
  return createNotification({
    userId: clientId,
    type: 'proposal',
    title: 'New Proposal Received',
    content: `${artistName} submitted a proposal for "${briefTitle}"`,
    referenceId: briefId,
    referenceType: 'brief',
  });
};

export const notifyProposalUpdate = async (
  artistId: string, 
  briefTitle: string,
  status: string
) => {
  const statusMessages: Record<string, string> = {
    accepted: 'Your proposal has been accepted! 🎉',
    rejected: 'Your proposal was not selected this time',
    shortlisted: 'Your proposal has been shortlisted',
  };

  return createNotification({
    userId: artistId,
    type: 'proposal_update',
    title: `Proposal ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    content: statusMessages[status] || `Your proposal for "${briefTitle}" was updated`,
    referenceType: 'proposal',
  });
};

export const notifyMilestoneUpdate = async (
  recipientId: string,
  workspaceId: string,
  milestoneTitle: string,
  status: string,
  isClient: boolean
) => {
  const messages: Record<string, { client: string; artist: string }> = {
    in_progress: {
      client: `Artist started work on "${milestoneTitle}"`,
      artist: `You started work on "${milestoneTitle}"`,
    },
    submitted: {
      client: `Work submitted for review: "${milestoneTitle}"`,
      artist: `Work submitted for "${milestoneTitle}"`,
    },
    approved: {
      client: `You approved "${milestoneTitle}"`,
      artist: `"${milestoneTitle}" has been approved! 🎉`,
    },
    paid: {
      client: `Payment released for "${milestoneTitle}"`,
      artist: `Payment received for "${milestoneTitle}"! 💰`,
    },
    disputed: {
      client: `You requested changes for "${milestoneTitle}"`,
      artist: `Changes requested for "${milestoneTitle}"`,
    },
  };

  const content = messages[status]?.[isClient ? 'client' : 'artist'] || 
    `Milestone "${milestoneTitle}" updated to ${status}`;

  return createNotification({
    userId: recipientId,
    type: 'milestone',
    title: 'Milestone Update',
    content,
    referenceId: workspaceId,
    referenceType: 'workspace',
  });
};

export const notifyPaymentReleased = async (
  artistId: string,
  amount: number,
  workspaceId: string
) => {
  return createNotification({
    userId: artistId,
    type: 'payment',
    title: 'Payment Released! 💰',
    content: `$${amount.toLocaleString()} has been released for your work`,
    referenceId: workspaceId,
    referenceType: 'workspace',
  });
};

export const notifyProjectInvite = async (
  artistId: string,
  clientName: string,
  workspaceId: string,
  projectTitle: string
) => {
  return createNotification({
    userId: artistId,
    type: 'project_invite',
    title: 'New Project Invitation',
    content: `${clientName} invited you to collaborate on "${projectTitle}"`,
    referenceId: workspaceId,
    referenceType: 'workspace',
  });
};

export const notifyJobApplicationUpdate = async (
  applicantId: string,
  jobTitle: string,
  status: string
) => {
  const statusMessages: Record<string, string> = {
    reviewing: 'Your application is being reviewed',
    shortlisted: 'Congratulations! You\'ve been shortlisted',
    interview: 'You\'ve been invited for an interview! 🎉',
    offered: 'You\'ve received a job offer! 🎉',
    rejected: 'Your application was not selected',
  };

  return createNotification({
    userId: applicantId,
    type: 'job_application',
    title: 'Application Update',
    content: statusMessages[status] || `Your application for "${jobTitle}" was updated`,
    referenceType: 'job_application',
  });
};
