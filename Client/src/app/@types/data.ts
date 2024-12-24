export interface DataItem {
    _id: string;
    user_id: string;
    data: string;
    emotion: string;
    timestamp: string;
    created_at: string;
    updated_at: string;
    __v: number;
  }
  
  export interface ApiResponse {
    success: boolean;
    data: DataItem[];
  }
  
  