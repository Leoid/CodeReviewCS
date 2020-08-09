import java.io.*;
class JavaDemo4{

public static void main(String args[]){

    //Get the User object from a file
    String fname = args[0];
    User u1;

    try{

        FileInputStream file = new FileInputStream(fname);
        ObjectInputStream in = new ObjectInputStream(file);

        // Deserializing the User object
        u1 = (User)in.readObject();

        in.close();
        file.close();

        System.out.println("name = "+u1.name);
        System.out.println("role = "+u1.role);

        Login(u1.role,u1.name);

        }
        catch(IOException ex){
            System.out.println("Error!");
        }
        catch(ClassNotFoundException ex){
            System.out.println("Class Error");
        }

}
public static void Login(String role, String name){
        if(role.equals("admin")){
            System.out.println("[+] [Admin] Login Successful: "+name);
        }
        else{
            System.out.println("[+] Login Successful: "+name);
        }
    }
}
