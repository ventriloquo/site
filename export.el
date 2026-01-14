;; https://www.reddit.com/r/emacs/comments/116yit2/help_me_configure_orgpublish_autositemap_to/
(defun my-sitemap-entry (entry style project)
  "Customized sitemap entry creation function, to use my /nicer/ formatting."
  (let* ((date (org-publish-find-date entry project)))
    (format "%s[[file:%s][%s]]"
	    (if date (format-time-string "[%Y-%m-%d] " date) "")
	    entry
	    (org-publish-find-title entry project))))

(setq current_theme	(format " %s " (nth 0 custom-enabled-themes))
      accent_color	(face-attribute 'cursor  :background nil 'default)
      background_00	(face-attribute 'hl-line :background nil 'default)
      background_01	(face-attribute 'default :background)
      foreground	(face-attribute 'default :foreground)

      org-html-head-extra (concat
			   "<head><link rel='icon' href='/assets/fav.png'></head>"
			   "<style>"
			   (with-temp-buffer (insert-file-contents "src/assets/styles.css") (buffer-string))
			   "\n:root {\n"
			   "\t--bg-1:\t" background_01	";\n"
			   "\t--bg-0:\t" background_00	";\n"
			   "\t--fg:\t"   foreground	";\n"
			   "\t--ac:\t"   accent_color	";\n"
			   "} /*"        current_theme	"*/\n" 
			   "</style>")

      org-html-preamble (concat
			 "<header>"
			 "<nav>"
			 "<div class='home_link'>"
			 "<a class='text' href='/'>Início</a>"
			 "</div>"
			 "<div id='nav_list' class='nav_items'>"
			 (with-temp-buffer (insert-file-contents "src/assets/links.html") (buffer-string))
			 "</div>"
			 "<button popovertarget='nav_menu' popovertargetaction='toggle' class='nav_menu'>Menu</button>"
			 "</nav>"
			 "<div popover='' id='nav_menu'>"
			 "<a href='/'>Início</a>"
			 (with-temp-buffer (insert-file-contents "src/assets/links.html") (buffer-string))
			 "</div>"
			 "</header>")
      
      org-html-postamble (concat
			  "<footer>"
			  "<p>Criado com: %c</p>"
			  "<p>Por: <a href='https://codeberg.org/tukain/'>Tukain</a></p>"
			  "<p>"
			  "Tema: " current_theme
			  " "
			  "<span class='color_block' style='background-color:" background_00 "'></span>"
			  "<span class='color_block' style='background-color:" background_01 "'></span>"
			  "<span class='color_block' style='background-color:" foreground    "'></span>"
			  "<span class='color_block' style='background-color:" accent_color  "'></span>"
			  "</p>"
			  "</footer>")

      org-export-with-section-numbers	nil
      org-export-with-toc		3
      org-export-default-language       "pt-br"
      org-export-with-todo-keywords	t
      org-confirm-babel-evaluate        nil
      org-html-doctype                  "html5"
      org-html-html5-fancy              t
      org-html-head-include-scripts     nil
      org-publish-project-alist '(("Caderno do Tukain"
				   :base-directory "src"
				   :base-extension "org"
				   :publishing-directory "public"
				   :publishing-function org-html-publish-to-html
				   :recusive nil)
				  ("notes"
				   :base-directory "src/notes"
				   :auto-sitemap t
				   :sitemap-sort-files anti-chronologically
				   :sitemap-format-entry my-sitemap-entry
				   :sitemap-title ""
				   :base-extension "org"
				   :publishing-directory "public/notes"
				   :publishing-function org-html-publish-to-html
				   :recusive nil)
				  ("static"
				   :base-directory "src/assets"
				   :base-extension "jpg\\|png\\|webp\\|ttf\\|gif\\|css\\|js\\|html"
				   :recusive t
				   :publishing-directory "public/assets"
				   :publishing-function org-publish-attachment)))

(org-publish-all t)

