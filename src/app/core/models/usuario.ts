export interface Usuario{
  id:         string;
  username:   string;
  password:   string;
  nombre:     string;
  roles:      any[];
  inactive:   boolean;
}
