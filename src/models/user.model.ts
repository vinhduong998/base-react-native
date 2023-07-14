export interface TypedUser {
    _id?: string
    user_phone?: string
    user_address?: string
    user_birthday?: string
    user_birthday_year?: number
    base_height?: number
    base_weight?: number
    base_role?: string
    body_type?: string
    relationship_status?: string
    ethnicity?: string
    language?: string[]
    locking_for?: string[]
    where_to_meet?: string[]
    user_job?: string
    user_department?: string
    user_nation?: string
    user_gender?: string
    hiv_status?: string
    last_test?: any
    safety_practices?: any[]
    loc?: any
    social_link?: { key: string, value: string }[]
    createdAt?: string
    updatedAt?: string
    user_login?: string
    user_avatar?: string
    user_cover?: string
    display_name?: string
    user_role?: string
    bio?: string
    user_referrer?: string
    user_balance?: number
    user_status?: number
    last_active?: string
    user_active?: number
    follow_id?: any
    user_id?: string
    public_album?: any[]
    public_instagram?: any[]
    public_sound?: string
    user_avatar_thumbnail?: string
    map_count?: string
    distance?: number
    match_status?: number
    is_block?: number
    user_number?: number
    travel_city?: string | null,
    instagram_token?: string
    notification_status?: string
    user_interest?: string[]
    circle_point?: number
    is_avatar?: number
    validate_status?: number
    disable_account?: string
    user_mood?: {
        image: string
        text: string
    }
    message_stranger?: string
    country?: string
    video_number?: number
    user_education?: string
    user_religion?: string
    like_alcoholic?: string
    like_tobacco?: string
    have_children?: string
    living_with?: string
    user_question?: any[]
    user_type?: "A" | "B" | "C" | "D",
    is_match?: any
}


export interface TypedTransaction {
    transaction_id: string;
    transaction_value: number;
    transaction_ref?: string;
    transaction_note?: string;
    transaction_condition: string;
    transaction_current_balance: number;
    transaction_new_balance: number;
    // transaction_method: TRANSACTION_METHOD;
    object_id?: string;
    createAt: string;
    updateAt?: string;
    service_name?: string;
}

export interface TypedPlan {
    amount_of_day: number
    country: string
    createdAt: string
    description: string
    google_store_product_id: string
    handle: string
    handle_id: string
    image: string
    name: string
    price: number
    status: number
    type: string
    updatedAt: string
    version: string
    currency: string
    _id: string
}

export interface TypedLoginSSOParams {
    access_token: string | null;
    device_uuid?: string;
    device_type?: string;
    device_signature?: string;
    full_name?: string;
}

export interface TypedLoginEmailPasswordParams {
    user_email: string;
    password: string;
    remember?: number;
    device_uuid?: string;
    device_type?: string;
    device_signature?: string;
}
