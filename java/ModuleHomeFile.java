/***** typing your package path ******/
//package com.gochigo.Admin.home.module;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ModuleHomeFile {
    /**
     * 
     * @param contPath 파일 경로
     * 
     * @return seq 파일 시퀀스
     */
    public int getFileSeq(String contPath) {
        int seq = 0;
        seq = Integer.parseInt(contPath.substring(contPath.lastIndexOf("_") + 1, contPath.lastIndexOf(".")));
        return seq;
    }

    /**
     * 
     * @param filename 파일 이름
     * 
     * @return extention 파일 확장자
     */
    public String getFileExtention(String filename) {
        String extention = new String();
        extention = filename.substring(filename.lastIndexOf(".") + 1);
        return extention;
    }

    /**
     * 
     * @param base64Str base64 오리지널 data(data:image/png;base64,포함)
     * @param splitChar base64 정보 데이터를 제외하기 위한 문자
     * @return originData 정보 데이터를 제외한 오리진 데이터
     */
    public String getFileBase64OriginData(String base64Str, String splitChar) {
        String originData = new String();
        originData = base64Str.split(splitChar)[1].trim();
        return originData;
    }
    /**
     * 
     * @param filePath : 업로드할 파일 경로
     * @param fileName : 업로드할 파일 이름
     * @param fileData : 업로드할 byte[] 파일 데이터
     */
    public boolean uploadFile(String filePath, String fileName, byte[] fileData) {
        boolean condition = false;
        try {
            File file = new File(filePath);
            if (!file.isDirectory()) { file.mkdirs(); }
    
            OutputStream stream = new FileOutputStream(filePath + fileName);

            stream.write(fileData);
            stream.flush();
            stream.close();
            condition = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return condition;
    }
    /**
     * 
     * @param fullFilePath : 삭제할 파일 경로 + 파일 이름
     * @return 성공 / 실패
     */
    private boolean deleteFile(String fullFilePath){
        File file = new File(fullFilePath);
        boolean condition = false;
        if(file.exists()){
            if(file.delete()){
                condition = true;
            }
        }
        return condition;
    }
    /**
     * 
     * @param filePath : 삭제할 파일 경로 or 경로 + 파일 이름
     * @return 성공 / 실패
     */
    public boolean deleteDir(String filePath){
        File dir = new File(filePath);
        boolean condition = false;

        if(dir.exists() ){
            if(dir.isDirectory()){
                File[] files = dir.listFiles();
                if(files != null){
                    for(File file : files){
                        String path = file.getPath();
                        System.out.println("PATH ::: " + path);
                        if(file.isDirectory()){
                            deleteDir(path);
                        }else{
                            condition = deleteFile(path);
                        }
                    }
                }
                if(dir.delete()){ condition = true;}
            }else{
                deleteFile(filePath);
            }
        }
        return condition;
    }
    /**
     * 
     * @param currentPath 현재 파일 경로
     * @param movePath 이동할 파일 경로 
     * @return
     */
    public boolean renameAndMoveFile(String currentPath, String movePath){
        File file = new File(currentPath);
        boolean condition = false;
        if(file.exists()){
            condition = file.renameTo(new File(movePath));
        }
        return condition;
    }
}