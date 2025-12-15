import { supabase } from '../../supabase';
import { Prompt, Assistant } from '../../types';

export const api = {
    // --- Prompts ---

    async getPrompts(): Promise<Prompt[]> {
        const { data, error } = await supabase
            .from('prompts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching prompts:', error);
            throw error;
        }

        // Map database columns to UI types if necessary (snake_case -> camelCase)
        // Based on our SQL, we used snake_case for DB columns but types are mixed.
        // Let's assume we might need mapping if keys differ heavily. 
        // However, for Simplicity, we'll cast it if names match or map them.

        return (data || []).map((p: any) => ({
            ...p,
            imageUrl: p.image_url,
            fullPrompt: p.content,
            copyCount: p.copy_count,
            authorAvatar: p.author_avatar,
            createdAt: p.created_at
        })) as Prompt[];
    },

    async createPrompt(prompt: Partial<Prompt>): Promise<Prompt> {
        // Validate Session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error("Você precisa estar logado para adicionar prompts.");
        }

        // Handle Tags (Ensure it is Array of Strings)
        let tagsArray: string[] = [];
        if (Array.isArray(prompt.tags)) {
            tagsArray = prompt.tags;
        } else if (typeof prompt.tags === 'string') {
            tagsArray = (prompt.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean);
        }

        // Transform camelCase to snake_case for DB
        const dbPayload = {
            title: prompt.title,
            description: prompt.description,
            category: prompt.category,
            tags: tagsArray,
            image_url: prompt.imageUrl,
            model: prompt.model,
            content: prompt.fullPrompt,
            author: prompt.author,
            author_avatar: prompt.authorAvatar,
            is_premium: false
        };

        const { data, error } = await supabase
            .from('prompts')
            .insert([dbPayload])
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            imageUrl: data.image_url,
            fullPrompt: data.content,
            copyCount: data.copy_count || '0',
            authorAvatar: data.author_avatar
        } as Prompt;
    },

    async deletePrompt(id: string | number): Promise<void> {
        const { error } = await supabase
            .from('prompts')
            .delete()
            .match({ id });

        if (error) throw error;
    },

    // --- Assistants ---

    async getAssistants(): Promise<Assistant[]> {
        const { data, error } = await supabase
            .from('assistants')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching assistants:', error);
            throw error;
        }

        return (data || []).map((a: any) => ({
            ...a,
            avatarUrl: a.avatar_url,
            linkUrl: a.link_url,
            systemInstructions: a.system_instructions // if needed in UI
        })) as Assistant[];
    },

    async createAssistant(assistant: Partial<Assistant>): Promise<Assistant> {
        const dbPayload = {
            name: assistant.name,
            role: assistant.role,
            description: assistant.description,
            avatar_url: assistant.avatarUrl,
            link_url: assistant.linkUrl
        };

        const { data, error } = await supabase
            .from('assistants')
            .insert([dbPayload])
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            avatarUrl: data.avatar_url,
            linkUrl: data.link_url
        } as Assistant;
    },

    async deleteAssistant(id: string | number): Promise<void> {
        const { error } = await supabase
            .from('assistants')
            .delete()
            .match({ id });

        if (error) throw error;
    }
};
