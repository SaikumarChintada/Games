/*
 * sudoku.cpp
 *
 *  Created on: 01-Mar-2015
 *      Author: Saikumar
 *  
 *
 *  Algo : At every cell start with 1.
 *         If compatible , move to next cell     
 *         else  increment the value
 *         If no val is possible , go to previous cell and increment from the existing value
 *                                  If no value is compatible , go again back to the previous cell 
 *                                   of the current cell         
 *  
 *  
 */



#include <cstdlib>
#include <iostream>
#define n 4
using namespace std ;  /* currently working on 4x4 sudoku*/


int s[4][4]={
              {0,2,0,0},
              {0,0,0,3},
              {2,0,1,0},
              {0,0,3,0}
            };
int marked[n][n];
void create_marked(){
    for(int i=0;i<n;i++){
        for (int  j=0;j<n;j++){
            if(s[i][j]) marked[i][j]=1;
            else marked[i][j]=0;
        }
    }
}
int col(int i,int j,int a){
    int flag=1;

    for(int index=0;index<n;index++){
        if (index !=j && s[i][index]==a){
            flag=0;
            break;
        }
    }

    return flag;
}

int row(int i,int j,int a){
    int flag=1;

    for(int index=0;index<n;index++){
        if (index !=i && s[index][j]==a){
            flag=0;
            break;
        }
    }

    return flag;
}
int compatible(int i,int j,int a){                  //to the point this function only sees
    if(row(i,j,a)  && col(i,j,a)) return 1;         //      rows and columns but no grid
    else return 0;
}

void next(int &a,int &b){
    if(b==n-1) {a=a+1;b=0;}
    else b=b+1;
}

void prev(int &a,int &b){	//range : 0 - (n-1)
    if(b==0){ b=n-1; a=a-1;}
    else b=b-1;
}


void print(){
    cout<< "solution "<<endl;
    for(int i = 0 ; i < n ; i++){
        for(int j = 0; j < n; j++)
            cout << s[i][j] <<" ";
        cout<<endl;
    }
    cout<<"end of sol"<<endl;
}

//at every cell start with 1 and upadate during backtrack
int rec(int i,int j,int flag){
    if(i<0 || j<0) {
        print();
        exit(1);
    }
	
    if(i==n && j==n-1) {return 1;}

    if(not marked[i][j]){
        int value=1;
        if(flag){               //flag==1 while backtracking
            value=s[i][j]+1;
            if(value>n){
                prev(i,j);
                rec(i,j,1);
                return 1;
            }
        }
        while(value<=n){        //checking for next compatible number
            if(compatible(i,j,value)){
                s[i][j]=value;  
                next(i,j);
                rec(i,j,0);
                //return 1;
            }
            value++;
        }

        prev(i,j);      //backwards
        rec(i,j,1);
        //return 1;
    }
    else{     
        if(flag){prev(i,j);}  
        else next(i,j);
        rec(i,j,flag);
        //return 1;

    }

}


int main(){
    create_marked();
    print();
    int t=rec(0,0,0);
    //print();
    return 0;
}
