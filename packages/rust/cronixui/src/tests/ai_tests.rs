//! Tests for AI-focused components

#[cfg(test)]
mod tests {
    use crate::components::ai::*;

    #[test]
    fn test_message_role_variants() {
        let user = MessageRole::User;
        let assistant = MessageRole::Assistant;
        let system = MessageRole::System;

        assert_eq!(user, MessageRole::User);
        assert_eq!(assistant, MessageRole::Assistant);
        assert_eq!(system, MessageRole::System);
        assert_ne!(user, assistant);
        assert_ne!(user, system);
        assert_ne!(assistant, system);
    }

    #[test]
    fn test_chat_message_user() {
        let msg = ChatMessage::user("Hello, world!");
        assert_eq!(msg.role, MessageRole::User);
        assert_eq!(msg.content, "Hello, world!");
        assert!(msg.id.starts_with("msg_"));
        assert!(msg.timestamp.is_none());
        assert!(msg.status.is_none());
    }

    #[test]
    fn test_chat_message_assistant() {
        let msg = ChatMessage::assistant("I can help with that.");
        assert_eq!(msg.role, MessageRole::Assistant);
        assert_eq!(msg.content, "I can help with that.");
        assert!(msg.id.starts_with("msg_"));
    }

    #[test]
    fn test_chat_message_ids_are_unique() {
        let msg1 = ChatMessage::user("First");
        let msg2 = ChatMessage::user("Second");
        assert_ne!(msg1.id, msg2.id);
    }

    #[test]
    fn test_chat_message_clone() {
        let original = ChatMessage::user("Original message");
        let cloned = original.clone();
        assert_eq!(original.id, cloned.id);
        assert_eq!(original.role, cloned.role);
        assert_eq!(original.content, cloned.content);
    }

    #[test]
    fn test_chat_message_debug() {
        let msg = ChatMessage::user("Debug test");
        let debug_str = format!("{:?}", msg);
        assert!(debug_str.contains("ChatMessage"));
        assert!(debug_str.contains("User"));
        assert!(debug_str.contains("Debug test"));
    }

    #[test]
    fn test_ai_status_type_variants() {
        let statuses = vec![
            AIStatusType::Connected,
            AIStatusType::Disconnected,
            AIStatusType::Connecting,
            AIStatusType::Error,
            AIStatusType::RateLimited,
            AIStatusType::Idle,
        ];

        assert_eq!(statuses.len(), 6);

        // Each variant should be unique
        for (i, status1) in statuses.iter().enumerate() {
            for (j, status2) in statuses.iter().enumerate() {
                if i != j {
                    assert_ne!(status1, status2);
                }
            }
        }
    }

    #[test]
    fn test_ai_status_type_clone() {
        let original = AIStatusType::Connected;
        let cloned = original.clone();
        assert_eq!(original, cloned);
    }

    #[test]
    fn test_ai_status_type_debug() {
        let status = AIStatusType::Connected;
        let debug_str = format!("{:?}", status);
        assert_eq!(debug_str, "Connected");
    }

    #[test]
    fn test_chat_message_with_string_into() {
        // Test that ChatMessage::user and ChatMessage::assistant accept &str
        let msg1 = ChatMessage::user(String::from("String content"));
        let msg2 = ChatMessage::assistant(&"Reference content");
        let msg3 = ChatMessage::user("String literal".to_string());

        assert_eq!(msg1.content, "String content");
        assert_eq!(msg2.content, "Reference content");
        assert_eq!(msg3.content, "String literal");
    }

    #[test]
    fn test_chat_message_with_various_content() {
        // Empty content
        let empty = ChatMessage::user("");
        assert!(empty.content.is_empty());

        // Long content
        let long_content = "a".repeat(10000);
        let long_msg = ChatMessage::assistant(&long_content);
        assert_eq!(long_msg.content.len(), 10000);

        // Special characters
        let special = ChatMessage::user("Hello! @#$%^&*()_+ 🎉 <script>alert('xss')</script>");
        assert!(special.content.contains("🎉"));
        assert!(special.content.contains("<script>"));
    }
}
